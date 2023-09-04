import { ContainerBox } from "../../styles/container";
import { ButtonSubmit, FormArea, InputArea } from "./styles";

export function Home() {
  return (
    <FormArea>
      <ContainerBox>
        <label htmlFor="profile">
          Digite seu perfil do github (ex: meu_github)
        </label>

        <div>
          <InputArea
            type="text"
            name="profile"
            id="profile"
            placeholder="Digite seu perfil"
          />

          <ButtonSubmit type="submit">Buscar</ButtonSubmit>
        </div>
      </ContainerBox>
    </FormArea>
  );
}
