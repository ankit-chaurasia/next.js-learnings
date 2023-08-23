import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// This code runs at server side
export async function getStaticProps(context) {
  console.log('Re-generating');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }
  if (data.products.length === 0) {
    console.log('products', products);
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
