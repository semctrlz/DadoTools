import * as Yup from 'yup';

import User from '../models/User';

class UserController{
  async store(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      sobrenome: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

    const userExists = await User.findOne({where: {email: req.body.email}})

    if(userExists){
      return res.status(400).json({
        error: "Usuário já existe.",
      });
    }

    const {id, nome, sobrenome, email} = await User.create(req.body);
    return res.json({
      id,
      nome,
      sobrenome,
      email,
    });
  }

  async update(req, res){
    const schema = Yup.object().shape({
      nome: Yup.string(),
      sobrenome: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string().min(6),
      oldPassword: Yup.string().min(6).when('password', (password, field)=>
      password?field.required():field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password? field.required().oneOf([Yup.ref('password')]): field
      ),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Validation fails'})
    }

      const {nome, sobrenome, email, oldPassword} = req.body;

      const user = await User.findByPk(req.idUsuario);

      if(email !== user.email){
        const userExists = await User.findOne({where: {email}})

        if(userExists){
          return res.status(400).json({
            error: "Usuário já existe.",
          });
        }
      }

      if(oldPassword  && !(await user.checkPassword(oldPassword))){
        return res.status(401).json({error: "Senha inválida!"});
      }

      const {id} = await user.update(req.body);

      return res.json({
        id,
        nome,
        sobrenome,
        email,
      });
  }
}

export default new UserController();
