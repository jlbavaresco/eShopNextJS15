import { notFound, redirect } from 'next/navigation';
import { getCategoriaPorCodigoDB, updateCategoriaDB, addCategoriaDB } from '@/bd/useCases/categoriaUseCases';
import CampoEntradaFloating from '@/componentes/comuns/CampoEntradaFloating';
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';

const FormularioPage = async ({ params }) => {
    let categoria = null;
    // capturando os parametros
    const { codigo } = await params;
    if (codigo == 0) {
        categoria = { codigo: 0, nome: "" };
    } else {
        try {
            categoria = await getCategoriaPorCodigoDB(codigo);
        } catch (err) {
            return notFound();
        }
    }

    const salvarCategoria = async (formData) => {
        'use server';
        const objeto = {
            codigo: formData.get('codigo'),
            nome: formData.get('nome')
        }
        try {
            if (objeto.codigo == 0) {
                await addCategoriaDB(objeto)
            } else {
                await updateCategoriaDB(objeto)
            }

        } catch (err) {
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/categoria/');
    };

    return (
        <Suspense fallback={<Loading />}>
            <div >
                <div style={{ textAlign: 'center' }}>
                    <h2>Categoria</h2>
                </div>
                <form action={salvarCategoria} >
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">
                                <CampoEntradaFloating id="txtCodigo"
                                    value={categoria.codigo} tipo="text"
                                    label="Código" readOnly={true}
                                    name="codigo" />
                                <CampoEntradaFloating id="txtNome"
                                    value={categoria.nome} tipo="text"
                                    label="Nome" required={true} name="nome" />


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