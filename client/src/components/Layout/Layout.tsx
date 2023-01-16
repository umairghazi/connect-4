import { Container } from "@mui/material"
import { Header } from "../index"


export const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}