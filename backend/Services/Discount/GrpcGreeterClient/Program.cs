
using System.Threading.Tasks;
using Discount.Grpc.Protos;
using Grpc.Net.Client;


// The port number must match the port of the gRPC server.
using var channel = GrpcChannel.ForAddress("https://localhost:51549");
var client = new DiscountProtoService.DiscountProtoServiceClient(channel);
var reply = await client.SayHelloFromDiscountAsync(
                  new HelloRequest { Name = "GreeterClient" });
Console.WriteLine("Greeting: " + reply.Message);




//using Discount.Grpc.Protos;
//using Grpc.Net.Client;

//using var channel = GrpcChannel.ForAddress("https://localhost:51549");


//var client = new DiscountProtoService.DiscountProtoServiceClient(channel);
//var reply = await client.SayHelloFromDiscountAsync(
//                  new HelloRequest { Name = "GreeterClient" });
//Console.WriteLine("Greeting: " + reply.Message);
