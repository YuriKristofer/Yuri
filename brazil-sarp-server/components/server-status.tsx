"use client"

import { useEffect, useState } from "react"
import { Server, Users, Loader2, AlertCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ServerData {
  name: string
  players: number
  maxPlayers: number
  status: "online" | "offline" | "dead"
}

export default function ServerStatus() {
  const [data, setData] = useState<ServerData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [time, setTime] = useState("00:00:00")

  useEffect(() => {
    async function fetchServerStatus() {
      try {
        // Não é mais necessário, pois o componente já está em um estado de carregamento
        // setIsLoading(true);
        const response = await fetch("/api/server-status")
        if (!response.ok) {
          throw new Error("Falha ao buscar dados do servidor.")
        }
        const serverData: ServerData = await response.json()
        setData(serverData)
        setError(null)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Ocorreu um erro desconhecido.")
        }
        setData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchServerStatus()
    const interval = setInterval(fetchServerStatus, 60000) // Atualiza a cada 60 segundos

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      })
      setTime(now)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-center flex flex-col justify-center items-center h-full">
        <div className="w-12 h-12 bg-gray-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
          <Loader2 className="h-6 w-6 text-gray-500 animate-spin" />
        </div>
        <div className="text-lg font-bold text-gray-500 mb-1">Carregando...</div>
        <div className="text-xs text-gray-400 font-medium">Status do Servidor</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-center flex flex-col justify-center items-center h-full">
        <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="h-6 w-6 text-red-500" />
        </div>
        <div className="text-lg font-bold text-red-500 mb-1">Offline</div>
        <div className="text-xs text-gray-400 font-medium">Status do Servidor</div>
      </div>
    )
  }

  const isOnline = data.status === "online"
  const playerPercentage = data.maxPlayers > 0 ? (data.players / data.maxPlayers) * 100 : 0

  return (
    <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-center hover:scale-105 transition-all duration-300 h-full flex flex-col justify-between">
      <div>
        <div
          className={`w-12 h-12 ${
            isOnline ? "bg-emerald-500/10" : "bg-red-500/10"
          } rounded-lg flex items-center justify-center mx-auto mb-3`}
        >
          <Server className={`h-6 w-6 ${isOnline ? "text-emerald-500" : "text-red-500"}`} />
        </div>
        <div className={`text-lg font-bold ${isOnline ? "text-emerald-500" : "text-red-500"} mb-1`}>
          {isOnline ? "Online" : "Offline"}
        </div>
        <div className="text-xs text-gray-400 font-medium mb-2">Status do Servidor</div>

        <div className="flex items-center justify-center space-x-2">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-mono text-white">
            {data.players} / {data.maxPlayers}
          </span>
        </div>
        <div className="mt-2 px-4">
          <Progress
            value={playerPercentage}
            className="h-1"
            indicatorClassName={isOnline ? "bg-emerald-500" : "bg-red-500"}
          />
        </div>
      </div>
      <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-center space-x-2">
        <Clock className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-mono text-white">{time}</span>
        <span className="text-xs text-gray-400">(BRT)</span>
      </div>
    </div>
  )
}
