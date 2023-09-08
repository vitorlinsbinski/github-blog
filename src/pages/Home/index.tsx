import { ContainerBox } from "../../styles/container";
import { ButtonSubmit, FormArea, InputArea, InputsContainer } from "./styles";

import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const newUserFormSchema = zod.object({
  username: zod.string().min(2),
  repository: zod.string().min(2),
});

type newUserFormInputs = zod.infer<typeof newUserFormSchema>;

export function Home() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    /*formState = { isSubmitting },*/
    reset,
  } = useForm<newUserFormInputs>({
    resolver: zodResolver(newUserFormSchema),
  });

  function handleSetNewUserForm(data: newUserFormInputs) {
    navigate(`/${data.username}/${data.repository}`);
    reset();
  }

  return (
    <FormArea onSubmit={handleSubmit(handleSetNewUserForm)}>
      <ContainerBox>
        <InputsContainer>
          <label htmlFor="profile">
            Digite seu perfil do github (ex: vitorlinsbinski)
          </label>
          <InputArea
            {...register("username")}
            type="text"
            name="username"
            id="username"
            placeholder="Digite seu perfil"
          />
          <label htmlFor="repository">
            Digite o repositório (ex: github-blog)
          </label>
          <InputArea
            {...register("repository")}
            type="text"
            name="repository"
            id="repository"
            placeholder="Digite o portifólio"
          />
          <ButtonSubmit type="submit">Buscar</ButtonSubmit>
        </InputsContainer>
      </ContainerBox>
    </FormArea>
  );
}
