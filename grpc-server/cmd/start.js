import hw from "grpc-proto/helloworld_pb.js"; const { HelloReply } = hw;
import hw_grpc from "grpc-proto/helloworld_grpc_pb.js"; const { GreeterService } = hw_grpc;
import { Server, ServerCredentials } from "@grpc/grpc-js";

/** 
 * todo: use type handleUnaryCall<hw.HelloRequest, hw.HelloReply>
 * @param {import("@grpc/grpc-js").ServerUnaryCall<hw.HelloRequest, hw.HelloReply>} call
 * @param {import("@grpc/grpc-js").sendUnaryData<hw.HelloReply>} callback
 * @returns {void}
 */
function sayHello(call, callback) {
    console.log("called sayHello impl");
    const reply = new HelloReply();
    reply.setMessage("Hello asdf " + call.request.getName());
    callback(null, reply);
}

function main() {
    console.log("grpc-server!");

    const server = new Server();
    server.addService(GreeterService, {
        sayHello: sayHello,
    });
    server.bindAsync("0.0.0.0:50051", ServerCredentials.createInsecure(), () => {
        console.log("starting grpc");
        server.start();
    });
}

main();
