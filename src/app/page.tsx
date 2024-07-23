'use client'

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-3">
      <h1>Começar o Sneaker`s Fortune</h1>
      <button
        onClick={() => {
          window.location.href = '/game'
        }}
      >
        Entrar
      </button>
    </div>
  )
}
