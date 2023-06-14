import React from "react";

export default function Stats() {
  return (
    <div>
      <h1>Estadisticas</h1>
      <iframe
        style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-project-0-iuwqj/embed/charts?id=647f8c16-ba3a-4e87-8c93-cde198285fb1&maxDataAge=3600&theme=light&autoRefresh=true"
      ></iframe>
      <iframe
        style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-project-0-iuwqj/embed/charts?id=647f8c98-a88f-46c5-8504-011d4faaacbb&maxDataAge=3600&theme=light&autoRefresh=true"
      ></iframe>
      <iframe
        style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);"
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-project-0-iuwqj/embed/charts?id=647f9926-23c6-4adb-81a6-74915d7fbff8&maxDataAge=3600&theme=light&autoRefresh=true"
      ></iframe>
    </div>
  );
}
