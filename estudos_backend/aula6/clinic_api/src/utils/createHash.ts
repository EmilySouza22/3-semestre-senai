import bcrypt from "bcrypt";

export async function hasheandoSenha(senha: string){
    const saltRounds = 10;
    const hash = await bcrypt.hash(senha, saltRounds);
    return hash;
}

