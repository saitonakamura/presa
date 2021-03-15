import 'styled-components'
import { Theme } from '@saitonakamura/presa';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
