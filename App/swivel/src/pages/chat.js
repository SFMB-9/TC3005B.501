import Head from 'next/head'
import dynamic from 'next/dynamic'

const AblyChatComponent = dynamic(() => import('../components/chat/AblyChatComponent'), { ssr: false });

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Realtime Chat App with Ably, NextJS and Vercel</title>
        <link rel="icon" href="https://static.ably.dev/motif-red.svg?nextjs-vercel" type="image/svg+xml" />
      </Head>

      <main>
        <h1 className="title">Next.js Chat Demo</h1>
        <AblyChatComponent />
      </main>

      <style jsx>{`
        .container {
          display: grid;
          grid-template-rows: 1fr 100px;
          min-height: 100vh;
          background-color: #eee;
        }

        main {
          display: grid;
          grid-template-rows: auto 1fr;
          width: calc(100% - 40px);
          max-width: 900px;
          margin: 20px auto;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0px 3px 10px 1px rgba(0,0,0,0.2);
          background-color: white;
        }

        .title {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
          margin: 0;
          color: white;
          background: #005C97;
          background: -webkit-linear-gradient(to right, #363795, #005C97);
          background: linear-gradient(to right, #363795, #005C97);
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
          fill:#005C97; 
          color:#fff; 
          position: absolute; 
          top: 0; 
          border: 0; 
          right: 0; 
        }

        .octo-arm {
          transform-origin: 130px 106px;
        }

        .github-corner:hover .octo-arm {
          animation: octocat-wave 560ms ease-in-out;
        }
        
        @keyframes octocat-wave {
          0%, 100%{transform:rotate(0)}
          20%,60%{transform:rotate(-25deg)}
          40%,80%{transform:rotate(10deg)}}
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
        }

        * {
          box-sizing: border-box;
        }

        [data-author="me"] {
          background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 0!important;
          border-bottom-left-radius: 10px!important;
        }
        
      `}</style>
    </div>
  )
}
