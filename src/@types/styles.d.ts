// Aqui só vão códigos de definição de tipageme em TypeScript
import "styled-components";
import { defaultTheme } from "../styles/themes/default";

// define a tipagem do defaultTheme à variável ThemeType
type ThemeType = typeof defaultTheme;

// cria uma tipagem para o módulo styled-components
declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
