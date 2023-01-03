import { useNavigate, useParams } from "react-router-dom";
import { LinearProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { VTextField } from "../../shared/forms";
import { Form } from "@unform/web";

export const DetalheDePessoas = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id = "nova" } = useParams<"id">();
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          console.log(
            "%cDetalheDePessoas.tsx line:19 result",
            "color: #007acc;",
            result
          );
        }
      });
    }
  }, []);

  const handleSave = () => {
    console.log(
      "%cDetalheDePessoas.tsx line:8 id",
      "color: black; background-color: #007acc;",
      id
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate('/pessoas');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova Pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmApagar={() => {handleDelete(Number(id))}}
          aoClicarEmSalvarEFechar={handleSave}
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvar={handleSave}
          mostrarBotaoSalvarEFechar
          aoClicarEmVoltar={() => {
            navigate("/pessoas");
          }}
        />
      }
    >

      <Form onSubmit={(dados) => console.log(dados)}>
        <VTextField name='nomeCompleto' />
        <button type="submit">enviar</button>
      </Form>

    </LayoutBaseDePagina>
  );
};
