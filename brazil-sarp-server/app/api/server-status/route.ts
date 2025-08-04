import { NextResponse } from "next/server"

export const dynamic = "force-dynamic" // Garante que a rota seja sempre dinâmica

export async function GET() {
  const SERVER_ID = "33440586" // ID do servidor Brazil S.A. RP no BattleMetrics
  const BATTLEMETRICS_API_URL = `https://api.battlemetrics.com/servers/${SERVER_ID}`

  try {
    const response = await fetch(BATTLEMETRICS_API_URL, {
      next: { revalidate: 60 }, // Revalida a cada 60 segundos
    })

    if (!response.ok) {
      // Lança um erro se a resposta da API não for bem-sucedida
      throw new Error(`Falha ao buscar dados do servidor: ${response.statusText}`)
    }

    const data = await response.json()

    // Extrai e formata os dados relevantes
    const serverData = {
      name: data.data.attributes.name,
      players: data.data.attributes.players,
      maxPlayers: data.data.attributes.maxPlayers,
      status: data.data.attributes.status,
      address: data.data.attributes.address,
      ip: data.data.attributes.ip,
      port: data.data.attributes.port,
      country: data.data.attributes.country,
      details: data.data.attributes.details,
    }

    return NextResponse.json(serverData)
  } catch (error) {
    console.error("Erro na API BattleMetrics:", error)
    return NextResponse.json({ error: "Falha ao buscar o status do servidor." }, { status: 500 })
  }
}
