import { notFound, redirect } from 'next/navigation';
import { getCategoriasDB } from '@/bd/useCases/categoriaUseCases';
import { getProdutoPorCodigoDB, addProdutoDB, updateProdutoDB } from '@/bd/useCases/produtoUseCases';
import Loading from '@/componentes/comuns/Loading';
import { Suspense } from 'react';
import CampoEntradaFloating from '@/componentes/comuns/CampoEntradaFloating';
import CampoSelectFloating from '@/componentes/comuns/CampoSelectFloating';
import CampoTextArea from '@/componentes/comuns/CampoTextArea';

const FormularioPage = async ({ params }) => {

    const categorias = await getCategoriasDB();

    let produto = null;

    const { codigo } = await params;

    if (codigo == 0) {
        produto = {
            codigo: 0,
            nome: "",
            descricao: "",
            quantidade_estoque: "",
            valor: "",
            ativo: true,
            data_cadastro: new Date().toISOString().slice(0, 10),
            categoria: ""
        };
    } else {
        try {
            produto = await getProdutoPorCodigoDB(codigo);
        } catch (err) {
            return notFound();
        }
    }

    const salvarProduto = async (formData) => {
        'use server';

        const objeto = {
            codigo: formData.get('codigo'),
            nome: formData.get('nome'),
            descricao: formData.get('descricao'),
            quantidade_estoque: formData.get('quantidade_estoque'),
            valor: formData.get('valor'),
            ativo: formData.get('ativo'),
            data_cadastro: formData.get('data_cadastro'),
            categoria: formData.get('categoria')
        }
        try {
            if (objeto.codigo == 0) {
                await addProdutoDB(objeto)
            } else {
                await updateProdutoDB(objeto)
            }

        } catch (err) {
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/produto/');

    };

    return (
        <Suspense fallback={<Loading />}>
            <div >
                <div style={{ textAlign: 'center' }}>
                    <h2>Produto</h2>
                </div>
                <form action={salvarProduto} >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">

                                <CampoEntradaFloating id="campoCodigo"
                                    value={produto.codigo} tipo="text"
                                    label="Código" readOnly={true}
                                    name="codigo" />
                                <CampoEntradaFloating id="campoNome"
                                    value={produto.nome} tipo="text"
                                    label="Nome" readOnly={false} required={true}
                                    name="nome" />
                                <CampoTextArea id="campoDescricao"
                                    value={produto.descricao}
                                    label="Descrição"
                                    name="descricao"/>
                                <CampoEntradaFloating id="campoEstoque"
                                    value={produto.quantidade_estoque} tipo="number"
                                    label="Estoque" readOnly={false} required={true}
                                    name="quantidade_estoque" />
                                <CampoEntradaFloating id="campoValor"
                                    value={produto.valor} tipo="number"
                                    label="Valor" readOnly={false} required={true}
                                    name="valor" />
                                <CampoEntradaFloating id="campoData"
                                    value={produto.data_cadastro} tipo="date"
                                    label="Data de cadastro" readOnly={false}
                                    name="data_cadastro" required={true} />
                                <CampoSelectFloating id="selectAtivo"
                                    value={produto.ativo} label="Ativo" required={true}
                                    name="ativo">
                                    <option value={true}>Sim</option>
                                    <option value={false}>Não</option>
                                </CampoSelectFloating>
                                <CampoSelectFloating id="selectCategoria"
                                    value={produto.categoria} label="Categoria" required={true}
                                    name="categoria">
                                    <option disabled="true" value="">
                                        Selecione a categoria
                                    </option>
                                    {
                                        categorias.map((cat) => (
                                            <option key={cat.codigo}
                                                value={cat.codigo}>
                                                {cat.nome}
                                            </option>
                                        ))
                                    }
                                </CampoSelectFloating>
                                <div className="form-group text-center mt-3">
                                    <button type="submit" className="btn btn-success">
                                        Salvar <i className="bi bi-save"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Suspense>
    )
};

export default FormularioPage;