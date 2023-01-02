import { Card, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom"

import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { TPessoasComTotalCount } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";

export const ListagemDePessoas: React.FC = () => {
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [list, setList] = useState<TPessoasComTotalCount>();
  const { debounce } = useDebounce();

  const busca = useMemo(() => {
    return searchParams.get('busca') || ''
  }, [searchParams]);

  useEffect(() => {

    debounce(
      () => {
        PessoasService.getAll(1, busca).then((result) => {
          if(result instanceof Error) {
            alert(result.message); 
            return;
          }

          setList(result);
          console.log(result)
        });
      }
    )

  }, [busca])

  return (
    <LayoutBaseDePagina 
      titulo="Listagem de Pessoas"
      barraDeFerramentas={
        <FerramentasDaListagem 
          textoBotaoNovo="Nova"
          mostrarInputBusca
          textoDaBusca={busca}
          aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
        />
      }
    >
      <Card >
        <Table>
            <TableHead>
              <TableRow>
              <TableCell>
                id
              </TableCell>
              <TableCell>
                Nome
              </TableCell>
              <TableCell>
                Email
              </TableCell>
               </TableRow>
            </TableHead>
         <TableBody>
          {list?.data.map((pessoa) => {
            const { nomeCompleto, id, email, } = pessoa;

            return (
                <TableRow key={id}>
                  <TableCell>
                    {id}
                  </TableCell>
                  <TableCell>
                    {nomeCompleto}
                  </TableCell>
                  <TableCell>
                    {email}
                  </TableCell>
                </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </Card>

    </LayoutBaseDePagina>
  )

}