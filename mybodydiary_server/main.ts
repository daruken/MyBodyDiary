class Server {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
 
  greet() {
    console.log(`Hi! I am ${this.name}`);
  }
}

const server = new Server("hongten");
server.greet();
