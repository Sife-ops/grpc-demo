import hw from "grpc-proto/helloworld_pb.js"; const { HelloRequest } = hw;
import hw_grpc from "grpc-proto/helloworld_grpc_pb.js"; const { GreeterClient } = hw_grpc;
import { credentials } from "@grpc/grpc-js";

function main() {
    const client = new GreeterClient("localhost:50051", credentials.createInsecure());

    const request = new HelloRequest();
    request.setName("Adam");

    client.sayHello(request, function(err, response) {
        if (err) {
            console.log(err);
        }
        console.log("got response:");
        console.log(response.getMessage());
    })
}

main()
