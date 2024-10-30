import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getProdutosDB, deleteProdutoDB } from '@/bd/useCases/produtoUseCases';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";

const deleteProduto = async (codigo) => {
    'use server';
    try {
        await deleteProdutoDB(codigo);
    } catch (err) {
        console.log(err);
        throw new Error('Erro: ' + err);
    }
    redirect('/privado/produto/');
};

// Defina a página como dinâmica para evitar cache automático
export const dynamic = 'force-dynamic';

export default async function Produto() {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const produtos = await getProdutosDB();

    return (
        <Suspense fallback={<Loading />}>
            <div style={{ padding: '20px' }}>
                <h1>Produtos</h1>
                <Link className="btn btn-primary"
                    href={`/privado/produto/${0}/formulario`}>
                    Novo <i className="bi bi-file-earmark-plus"></i>
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{
                                textAlign: 'center'
                            }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Estoque</th>
                            <th>Ativo</th>
                            <th>Data Cadastro</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.codigo}>
                                <td align="center">
                                    <Link className="btn btn-info"
                                        href={`/privado/produto/${produto.codigo}/formulario`}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    {
                                        session?.user?.tipo === 'A' &&
                                        <form action={deleteProduto.bind(null, produto.codigo)} className="d-inline">
                                            <Button variant="danger" type='submit'>
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </form>
                                    }
                                </td>
                                <td>{produto.codigo}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.descricao}</td>
                                <td>{produto.quantidade_estoque}</td>
                                <td>{produto.ativo ? 'Sim' : 'Não'}</td>
                                <td>{produto.data_cadastro}</td>
                                <td>{produto.categoria_nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Suspense>
    )
}