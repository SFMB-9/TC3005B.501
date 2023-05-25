const { createWorker } = require('tesseract.js');


export default async function handler(req, res) {


  const FILE_LOC = req.body.idURL;


  let rec = {};

  /* Prepare file for OCR recognition */

  const worker = await createWorker();

  let recognizedText = await (async () => {
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(FILE_LOC);
    await worker.terminate();
    return text;
  })();


  /* Match INE standard pattern text */
  let match_cic = recognizedText.match(/\d{9}(?=\d{1}<<)(?!IDMEX)/);
  let match_cid = recognizedText.match(/\d{9}(?=\n|\s)(?!<<)/);



  /* If no match is found, then the photo must be invalid or hard to read: try again */
  if (match_cic == null || match_cid == null) {

    rec = {
      err: "La foto no es visible, intente de nuevo.",
      validate: false,
      elector_id: null
    }

    res.send({
      msg: "La foto no es visible, intente de nuevo.",
      validated: false
    })
    return;



  } else {



    rec =
    {
      model: "e",
      cic: recognizedText.match(/\d{9}(?=\d{1}<<)(?!IDMEX)/)[0],
      citizen_id: recognizedText.match(/\d{9}(?=\n|\s)(?!<<)/)[0]
    }


  }

  const URL = "https://ine2.p.rapidapi.com/validate-ine";
  const request = {

    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '0f48920e65msh7a1f10b6195a072p147c3djsn41fc7b160675',
      'X-RapidAPI-Host': 'ine2.p.rapidapi.com'
    },
    body: JSON.stringify(rec)

  }

  try {
    const response = await fetch(URL, request);
    const resultJSON = await response.text();


    const result = JSON.parse(resultJSON);
    console.log(result);
    if (result.can_vote == true) {

      res.send({
        msg: "Hemos validado su identificación con éxito.",
        validated: true
      })

    } else {

      res.send({
        msg: "Su identificación no es valida; revise con su agente.",
        validated: false
      })

    }



  } catch (err) {

    res.send({
      msg: "No hemos podido validar tu identificación, intenta de nuevo.",
      validated: false
    })

  }

}

