import { ContainerBox } from "../../styles/container";
import { ButtonSubmit, FormArea, InputArea, InputsContainer } from "./styles";

export function Home() {
  return (
    <FormArea>
      <ContainerBox>
        <InputsContainer>
          <label htmlFor="profile">
            Digite seu perfil do github (ex: vitorlinsbinski)
          </label>

          <InputArea
            type="text"
            name="profile"
            id="profile"
            placeholder="Digite seu perfil"
          />

          <label htmlFor="repository">
            Digite o repositório (ex: github-blog)
          </label>

          <InputArea
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
