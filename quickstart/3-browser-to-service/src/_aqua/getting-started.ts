/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.2.2-221
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';


// Services

//HelloWorld
//defaultId = undefined

//hello: (from: string) => {msg:string;reply:string}
//END HelloWorld




//Counter
//defaultId = undefined

//count: (msg: string) => string
//END Counter




//HelloPeer
//defaultId = "HelloPeer"

//hello: (message: string) => string
//END HelloPeer



// Functions

export async function sayHello(client: FluenceClient, targetPeerId: string, targetRelayPeerId: string, config?: {ttl?: number}): Promise<string> {
    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "targetPeerId") [] targetPeerId)
       )
       (call %init_peer_id% ("getDataSrv" "targetRelayPeerId") [] targetRelayPeerId)
      )
      (call -relay- ("op" "noop") [])
     )
     (xor
      (seq
       (seq
        (call -relay- ("op" "noop") [])
        (call "12D3KooWFEwNWcHqi9rtsmDhsYcDbRUCDXH84RC4FW6UfsFWaoHi" ("1e740ce4-81f6-4dd4-9bed-8d86e9c2fa50" "hello") [%init_peer_id%] comp)
       )
       (call "12D3KooWFEwNWcHqi9rtsmDhsYcDbRUCDXH84RC4FW6UfsFWaoHi" ("ac1db18a-09b6-46a7-8575-4e1a3e990af2" "count") [comp.$.msg!] num)
      )
      (seq
       (call -relay- ("op" "noop") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
      )
     )
    )
    (call -relay- ("op" "noop") [])
   )
   (par
    (seq
     (call targetRelayPeerId ("op" "noop") [])
     (xor
      (call targetPeerId ("HelloPeer" "hello") [%init_peer_id%] res)
      (seq
       (seq
        (call targetRelayPeerId ("op" "noop") [])
        (call -relay- ("op" "noop") [])
       )
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
      )
     )
    )
    (null)
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [num])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'targetPeerId', () => {return targetPeerId;});
h.on('getDataSrv', 'targetRelayPeerId', () => {return targetRelayPeerId;});
                h.onEvent('callbackSrv', 'response', (args) => {
    const [res] = args;
  resolve(res);
});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for sayHello');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      
