import bcrypt from "bcrypt";
import User from "./src/app/models/User.js";

async function seed() {
  try {
    // Aguardar conexão
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Criar usuário admin
    const password_hash = await bcrypt.hash("123456", 6);
    const [user, created] = await User.findOrCreate({
      where: { email: "rainer@gmail.com" },
      defaults: {
        name: "Rainer",
        email: "rainer@gmail.com",
        password_hash,
        admin: true,
      },
    });
    console.log(
      "Usuário criado ou já existe:",
      user.toJSON(),
      "Criado:",
      created,
    );

    console.log("Dados inseridos com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
    process.exit(1);
  }
}

seed();
