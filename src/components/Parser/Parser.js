import React, { useContext } from 'react';

import './Parser.css';
import { ThemeContext } from '../../contexts/ThemeContext';
import { parserData } from '../../data/parserData'
import { useMemo, useState } from 'react';
import { parseMachinesFromFile } from 'xstate-parser-demo';
import { StateMachine } from "xstate";
// import {MachineParseResult} from './src/MachineParseResult';



function Parser() {

    const [text, setText] = useState(`{createMachine({ initial: 'wow' })}`);
    const result = useMemo(() => {
      try {
        return parseMachinesFromFile(text).machines.map((machine) => {
          return machine.toConfig() || "could not compile";
        });
      } catch (e) {
        return "Could not parse";
      }
    }, [text]);
    console.log(result)

    const { theme } = useContext(ThemeContext);
    return (
        <div className="parser" id="parser" style={{backgroundColor: theme.secondary}}>
            <div className="line-styling">
              <div className="style-circle" style={{backgroundColor: theme.primary}}></div>
              <div className="style-circle" style={{backgroundColor: theme.primary}}></div>
              <div className="style-line" style={{backgroundColor: theme.primary}}></div>
            </div>
            <div className="about-body">
                <div className="about-description">
                    <h2 style={{color: theme.primary}}>{parserData.title}</h2>
                    <p style={{color:theme.tertiary80}}>{parserData.description1}<br/><br/>{parserData.description2}</p>
                    
                   <table>
                    <tr>
                        <th>Xstate</th>
                        <th>JSON</th>
                    </tr>
                    <tr>
                        <td>
                            <textarea
                                value={text}
                                className="h-full w-full p-4 font-mono bg-transparent bg-white overflow-y-auto resize-none text-sm focus:outline-none focus:ring-4"
                                onChange={(e) => setText(e.target.value)}
                                autoFocus
                            />
                        </td>
                        <td>
                        <pre className="font-mono h-full w-full overflow-y-auto ">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                        </td>
                    </tr>
                   </table>
                    
                    
            
                </div>
                {/* <div className="parser-img">
                    <img 
                        src={parserData.image === 1 ? theme.parserimg1 : theme.parserimg2}  
                        alt="" 
                    />
                </div> */}
            </div>
        </div>

    );

// return (
// <div>
// <textarea
//           value={text}
//           className="h-full w-full p-4 font-mono bg-transparent bg-white overflow-y-auto resize-none text-sm focus:outline-none focus:ring-4"
//           onChange={(e) => setText(e.target.value)}
//           autoFocus
//         />
//         <pre className="font-mono h-full w-full overflow-y-auto ">
//                    {JSON.stringify(result, null, 2)}
//                  </pre>
//                  </div>
// );
//   return (
//     <main className="w-screen h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
//       <div className="flex-1 h-screen p-4 overflow-y-auto flex flex-col">
//         <h1 className="font-bold mb-4 text-lg">Copy XState code in here...</h1>
//         <textarea
//           value={text}
//           className="h-full w-full p-4 font-mono bg-transparent bg-white overflow-y-auto resize-none text-sm focus:outline-none focus:ring-4"
//           onChange={(e) => setText(e.target.value)}
//           autoFocus
//         />
//       </div>
//       <div className="flex-1 h-screen flex flex-col p-4">
//         <h1 className="font-bold mb-4 text-lg">
//           ...and see the parse result here
//         </h1>
//         <pre className="font-mono h-full w-full overflow-y-auto ">
//           {JSON.stringify(result, null, 2)}
//         </pre>
//       </div>
//     </main>
//   );
}

export default Parser
