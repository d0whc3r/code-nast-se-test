import News from './components/News/News'

function App() {
  return (
    <>
      <header>
        <h1 className="text-center">News board</h1>
      </header>
      <main className="md:container md:mx-auto">
        <News />
      </main>
    </>
  )
}

export default App
