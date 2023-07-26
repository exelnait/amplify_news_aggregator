
import {Sha256} from '@aws-crypto/sha256-js';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { SignatureV4 } from '@aws-sdk/signature-v4';
import { HttpRequest } from '@aws-sdk/protocol-http';
import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_ENDPOINT = process.env.API_NEWSAGGREGATOR_GRAPHQLAPIIDOUTPUT;
const AWS_REGION = process.env.AWS_REGION;

const endpoint = new URL(GRAPHQL_ENDPOINT);

const signer = new SignatureV4({
    credentials: defaultProvider(),
    region: AWS_REGION,
    service: 'appsync',
    sha256: Sha256
});


type GraphQLResponse<Q> = {
    statusCode: number,
    body: Q & { errors?: { status: string, message: string, stack?: string }[] }
}

export async  function apiRequest<Q, V>(query: string, input?: V): Promise<GraphQLResponse<Q>> {
    const requestToBeSigned = new HttpRequest({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            host: endpoint.host
        },
        hostname: endpoint.host,
        body: JSON.stringify({ query, variables: { input } }),
        path: endpoint.pathname
    });

    const signed = await signer.sign(requestToBeSigned);
    const request = new Request(GRAPHQL_ENDPOINT, signed);

    let statusCode = 200;
    let body;
    let response;

    try {
        response = await fetch(request);
        body = await response.json();
        if (body.errors) statusCode = 400;
    } catch (error) {
        statusCode = 500;
        body = {
            errors: [
                {
                    status: response.status,
                    message: error.message,
                    stack: error.stack
                }
            ]
        };
    }

    return {
        statusCode,
        body
    }
}