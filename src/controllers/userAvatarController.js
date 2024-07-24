const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

const diskStorage = new DiskStorage();

class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id; // Certifique-se de que o objeto request.user está correto
        const avatarFilename = request.file.filename;

        // Debugging para garantir que user_id e avatarFilename não sejam indefinidos
        if (!user_id || !avatarFilename) {
            throw new AppError("Dados insuficientes para atualizar o avatar", 400);
        }

        const user = await knex("users")
            .where({ id: user_id })
            .first();

        if (!user) {
            throw new AppError("Somente usuários autenticados podem alterar o avatar", 401);
        }
        if (user.avatar) {
            await diskStorage.deleteFile(user.avatar);
        }

        const filename = await diskStorage.saveFile(avatarFilename);
        user.avatar = filename;

        await knex("users")
            .where({ id: user_id })
            .update({ avatar: user.avatar });

        return response.json(user);
    }
}

module.exports = UserAvatarController;
