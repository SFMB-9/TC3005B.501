import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import axios from "axios";

const AblyChatComponent = dynamic(
  () => import("../components/chat/AblyChatComponent"),
  { ssr: false }
);

export default function Chat() {
  const [username, setUsername] = useState("");
  const id = "645fcc679477b1b285dbc7a4";

  const getContact = async () => {
    try {
      const { data } = await axios.get("/api/chat/getContactName", {
        params: {
          id: id,
        },
      });
      setUsername(data.name + " " + data.surname);
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  };
  getContact();

  return (
    <div className="container">
      <Head>
        <title>Realtime Chat App with Ably, NextJS and Vercel</title>
        <link
          rel="icon"
          href="https://static.ably.dev/motif-red.svg?nextjs-vercel"
          type="image/svg+xml"
        />
      </Head>

      <main>
        <h1 className="title">{username}</h1>
        <AblyChatComponent />
      </main>

      <style jsx>{`
        .container {
          display: grid;
          grid-template-rows: 1fr 100px;
          min-height: 100vh;
          background-color: #f5f7fa;
        }

        main {
          display: grid;
          grid-template-rows: auto 1fr;
          width: calc(100% - 40px);
          max-width: 900px;
          margin: 20px auto;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.12),
            0px 1px 2px rgba(0, 0, 0, 0.24);
          background-color: white;
        }

        .title {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
          margin: 0;
          color: white;
          background: #578ffe; // Blue color
        }

        footer {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 100vw;
          height: 100px;
        }

        .logo {
          display: block;
          height: 20px;
          margin: 0.5em;
        }

        .svg {
          fill: #578ffe; // Blue color
          color: #fff;
          position: absolute;
          top: 0;
          border: 0;
          right: 0;
        }

        @media (min-width: 600px) {
          .logo {
            height: 40px;
            margin: 1em;
          }

          .ably {
            height: 60px;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          color: #333; // Dark grey color for text
        }

        * {
          box-sizing: border-box;
        }

        [data-author="me"] {
          background: #578ffe; // Blue color
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 0 !important;
          border-bottom-left-radius: 10px !important;
        }
      `}</style>
    </div>
  );
}
