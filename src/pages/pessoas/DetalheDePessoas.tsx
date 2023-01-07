import { useNavigate, useParams } from "react-router-dom";
import { LinearProgress, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { VTextField } from "../../shared/forms";
import { Form } from "@unform/web";
import { FormHandles, Scope } from "@unform/core";

interface IFormData {
  email: string;
  cidadeId: string;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id = "nova" } = useParams<"id">();
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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

  const handleSave = (dados: IFormData) => {
    console.log(
      "%c dados",
      "color: black; background-color: #007acc;",
      dados
    );
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso!");
          navigate("/pessoas");
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
          aoClicarEmApagar={() => {
            handleDelete(Number(id));
          }}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          mostrarBotaoSalvarEFechar
          aoClicarEmVoltar={() => {
            navigate("/pessoas");
          }}
        />
      }
    >
      <Form ref={formRef} onSubmit={(dados) => handleSave(dados)}>
        <VTextField name='nomeCompleto' />
        <VTextField name='email' />
        <VTextField name='cidadeId' />
      </Form>
    </LayoutBaseDePagina>
  );
};
