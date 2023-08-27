import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import PricesBox from '@/components/pricesBox'

async function getData() {
  const res = await fetch('https://prcheker.vercel.app/api/products')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const Prices = async () => {
  const prices = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center px-4 sm:px-14 xl:px-80">
      <Navbar />
      <PricesBox prices={prices} />
      <Footer />
    </main>
  )
}

export default Prices
