import React from "react";
import SANavbar from "@/components/SA/navbar";

export default function Stats() {
  return (
    <>
      <SANavbar />
      <div className='p-5 d-flex flex-column align-items-center gap-3'>
        <h1>Estadísticas</h1>
        <iframe
          style={{ background: "#FFFFFF", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" }}
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-project-0-iuwqj/embed/charts?id=647f8c16-ba3a-4e87-8c93-cde198285fb1&maxDataAge=3600&theme=light&autoRefresh=true"
        />
        <iframe
          style={{ background: "#FFFFFF", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" }}
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-project-0-iuwqj/embed/charts?id=647f8c98-a88f-46c5-8504-011d4faaacbb&maxDataAge=3600&theme=light&autoRefresh=true"
        />
        <iframe
          style={{ background: "#FFFFFF", border: "none", borderRadius: "2px", boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)" }}
          width="640"
          height="480"
          src="https://charts.mongodb.com/charts-project-0-iuwqj/embed/charts?id=647f9926-23c6-4adb-81a6-74915d7fbff8&maxDataAge=3600&theme=light&autoRefresh=true"
        />
      </div>
      {//<iframe src="https://swivelelastictest.kb.us-east4.gcp.elastic-cloud.com:9243/s/autos_estadisticas/app/dashboards#/view/8dd843c0-09e7-11ee-b5d2-e760748262dc?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))" height="600" width="800"></iframe>
       }
    </>
  );
}