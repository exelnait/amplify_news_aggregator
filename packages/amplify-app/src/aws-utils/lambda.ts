import {InvocationType, InvokeCommand, LambdaClient} from "@aws-sdk/client-lambda";

const client = new LambdaClient({});

export async function invokeLambda<I, O>(name: string, input: I, invocationType: string = InvocationType.RequestResponse): Promise<O> {
    const command = new InvokeCommand({
        FunctionName: name,
        Payload: jsonToUint8Array(input),
        InvocationType: invocationType
    });
    const response = await client.send(command);
    return uint8ArrayToJSON<O>(response.Payload)
}

export function invokeLambdaAsync<I>(name: string, input: I): void {
    console.log(`Invoking lambda ${name} with input: ${JSON.stringify(input)}`);
    invokeLambda<I, void>(name, input, InvocationType.Event).then();
}

// Convert string to uint8Array
function jsonToUint8Array(data: Record<string, any>): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(JSON.stringify(data));
}

function uint8ArrayToJSON<T>(array: Uint8Array): T {
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(array));
}