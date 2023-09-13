import { ContainerBox } from "../../styles/container";
import {
  ButtonSubmit,
  ErrorMessageForm,
  FormArea,
  InputArea,
  InputsContainer,
} from "./styles";

import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const newUserFormSchema = zod.object({
  username: zod
    .string()
    .nonempty({ message: "O nome do usuário é obrigatório" }),
  repository: zod
    .string()
    .nonempty({ message: "O nome do repositório é obrigatório" }),
});

type newUserFormInputs = zod.infer<typeof newUserFormSchema>;

export function Home() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
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
            Digite seu usuário do github (ex: vitorlinsbinski)
          </label>
          <InputArea
            {...register("username")}
            type="text"
            name="username"
            id="username"
            placeholder="Digite seu usuário"
          />
          {errors.username && (
            <ErrorMessageForm>({errors.username.message})</ErrorMessageForm>
          )}
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
          {errors.repository && (
            <ErrorMessageForm>({errors.repository.message})</ErrorMessageForm>
          )}

          <ButtonSubmit type="submit" disabled={isSubmitting}>
            Buscar
          </ButtonSubmit>
        </InputsContainer>
      </ContainerBox>
    </FormArea>
  );
}
