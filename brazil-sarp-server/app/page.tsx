"use client"

import type React from "react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import ServerStatus from "@/components/server-status"
import {
  Clock,
  Users,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Mail,
  Shield,
  Menu,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  Server,
  Gamepad2,
  Zap,
  Target,
  Map,
  Gift,
  Activity,
  Globe,
  FileText,
  UserPlus,
  Calendar,
  ArrowRight,
  Star,
  TrendingUp,
  Eye,
  BookOpen,
  FlaskConical,
  Biohazard,
  SignalZero,
  Radiation,
  Sprout,
  HeartCrack,
  Sunrise,
  Skull,
  WormIcon as Virus,
} from "lucide-react"

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

interface DonationForm {
  amount: number
  package: string
  steamId: string
  email: string
  message: string
}

export default function BrazilSARPServer() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("whitelist")
  const [scrollY, setScrollY] = useState(0)
  const [isContactLoading, setIsContactLoading] = useState(false)
  const [isDonationLoading, setIsDonationLoading] = useState(false)
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle")
  const [donationStatus, setDonationStatus] = useState<"idle" | "success" | "error">("idle")
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [donationForm, setDonationForm] = useState<DonationForm>({
    amount: 10,
    package: "",
    steamId: "",
    email: "",
    message: "",
  })

  // Gallery images
  const galleryImages = useMemo(
    () => [
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1494969.jpg-Fq7JWJE4NyypgbrxE0FgJgnLNugpzV.jpeg",
        alt: "Interior de bunker militar com equipamentos táticos",
        title: "Base Subterrânea",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1494954.jpg-mVZ3utoclCpj2LfNH1B13A8GJWXD24.jpeg",
        alt: "Sobrevivente militar observando paisagem de Chernarus",
        title: "Reconhecimento Tático",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1494946.jpg-26ZmXoFC4IoYDCdUNgmhp19g7CKLqH.jpeg",
        alt: "Sobrevivente explorando floresta nebulosa",
        title: "Exploração na Névoa",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1494987.jpg-J8GVAHwrzsEeJ677Hn8O4jXiK3MnMi.jpeg",
        alt: "Soldado em posição de observação em campo aberto",
        title: "Vigilância Avançada",
      },
      {
        src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1494960.jpg-XkTvV1biISAesycXikmjUOzEXrf6dU.jpeg",
        alt: "Sobrevivente coletando recursos no campo",
        title: "Sobrevivência Rural",
      },
    ],
    [],
  )

  // Server features
  const serverFeatures = useMemo(
    () => [
      {
        id: 1,
        name: "Roleplay Hardcore",
        icon: Target,
        description: "Sistema de RP rigoroso com personagens únicos e histórias envolventes",
        details: ["Whitelist obrigatória", "Personagens únicos", "Histórias conectadas", "RP 24/7"],
        color: "from-emerald-500 to-teal-600",
      },
      {
        id: 2,
        name: "Economia Realista",
        icon: TrendingUp,
        description: "Sistema econômico balanceado com trading e bases persistentes",
        details: ["Moeda própria (BRP)", "Trading entre players", "Bases persistentes", "Mercado dinâmico"],
        color: "from-blue-500 to-cyan-600",
      },
      {
        id: 3,
        name: "Eventos Semanais",
        icon: Zap,
        description: "Eventos únicos organizados pela staff para manter a experiência fresca",
        details: ["Eventos PvP", "Missões cooperativas", "Histórias dinâmicas", "Recompensas exclusivas"],
        color: "from-purple-500 to-violet-600",
      },
      {
        id: 4,
        name: "Mods Exclusivos",
        icon: Star,
        description: "Coleção curada de mods para melhorar a experiência de jogo",
        details: ["Armas realistas", "Veículos únicos", "Construção avançada", "Interface melhorada"],
        color: "from-orange-500 to-red-600",
      },
    ],
    [],
  )

  // Enhanced server statistics (static part)
  const enhancedServerStats = useMemo(
    () => [
      {
        label: "Whitelist Ativa",
        value: "OBRIGATÓRIA",
        icon: Shield,
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
      },
      {
        label: "Primeira Sessão",
        value: "EM BREVE",
        icon: Calendar,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
      },
      {
        label: "Mods Exclusivos",
        value: "15+",
        icon: Star,
        color: "text-orange-500",
        bgColor: "bg-orange-500/10",
      },
      {
        label: "Eventos Semanais",
        value: "GARANTIDOS",
        icon: Zap,
        color: "text-pink-500",
        bgColor: "bg-pink-500/10",
      },
    ],
    [],
  )

  const loreData = useMemo(
    () => [
      {
        year: "2000",
        title: "Início da Pesquisa Proibida",
        description:
          "Uma coalizão clandestina de cientistas russos, chineses e ucranianos inicia o projeto “B13” em uma base na Ucrânia, buscando reativar tecidos mortos com retrovírus sintéticos para fins médicos e militares.",
        icon: FlaskConical,
        color: "text-cyan-500",
      },
      {
        year: "2003",
        title: "O Primeiro Reanimado",
        description:
          "Um técnico exposto ao composto gasoso PXO-B13 morre e reanima com agressividade extrema. O incidente é abafado, mas a pesquisa continua sob sigilo absoluto.",
        icon: Biohazard,
        color: "text-yellow-500",
      },
      {
        year: "2005",
        title: "Interesse Geopolítico",
        description:
          "Após vazamentos na deep web, potências globais monitoram o B13. A pesquisa é descentralizada para locais secretos, e o vírus é classificado como um risco existencial.",
        icon: Globe,
        color: "text-blue-500",
      },
      {
        year: "2008",
        title: "Guerra e Testes",
        description:
          "Durante a Guerra Russo-Georgiana, facções usam versões instáveis do B13 em prisioneiros. Relatos de “mortos que andam” são atribuídos à histeria de guerra.",
        icon: Shield,
        color: "text-orange-500",
      },
      {
        year: "2010",
        title: "O Vírus Transcontinental",
        description:
          "Casos de uma encefalite viral anômala surgem globalmente. Pacientes morrem e reanimam com comportamento agressivo. Governos suprimem a informação, alegando surtos isolados.",
        icon: Virus,
        color: "text-red-500",
      },
      {
        year: "2012",
        title: "A Revelação Científica",
        description:
          "Dr. Emil Drachkov, ex-cientista do projeto, vaza documentos revelando que o B13 está latente em toda a humanidade, ativando-se apenas após a morte. O pânico global se instaura.",
        icon: BookOpen,
        color: "text-indigo-500",
      },
      {
        year: "2014",
        title: "O Descontrole",
        description:
          "Tentativas de contenção falham. Grandes cidades como Berlim e Buenos Aires entram em colapso em 48 horas. O termo “infectado” é adotado para descrever os reanimados.",
        icon: Skull,
        color: "text-rose-500",
      },
      {
        year: "2015",
        title: "O Evento Zero",
        description:
          "Um ataque com bombas PXO na Ucrânia libera o vírus em escala massiva. Chernarus se isola do mundo, mas é tarde demais.",
        icon: Biohazard,
        color: "text-red-600",
      },
      {
        year: "2016",
        title: "O Encalhe de Berezino",
        description:
          "Um cargueiro militar russo com infectados encalha na costa de Berezino, Chernarus. A contenção falha, e a praga se espalha pelo litoral, dizimando vilas costeiras.",
        icon: Zap,
        color: "text-amber-500",
      },
      {
        year: "2017",
        title: "Radiação e Mutação",
        description:
          "Falhas em reatores nucleares causam vazamentos, alterando os infectados expostos. Surgem os “Infectados NBC”, mais resistentes e erráticos.",
        icon: Radiation,
        color: "text-lime-500",
      },
      {
        year: "2018",
        title: "O Grande Apagão",
        description:
          "Satélites e a internet entram em colapso. O mundo mergulha em um eclipse digital. A comunicação global cessa, e o verdadeiro inimigo passa a ser o outro sobrevivente.",
        icon: SignalZero,
        color: "text-slate-500",
      },
      {
        year: "2020",
        title: "O Retorno à Terra",
        description:
          "A agricultura de subsistência retorna. Em Chernarus, surge uma forma local de comércio baseada em BRP (Brazil RP) — unidades de valor baseadas em recursos, munições e trabalho. Zonas seguras como Rádio Zenit são sobrecarregadas.",
        icon: Sprout,
        color: "text-green-500",
      },
      {
        year: "2021-2023",
        title: "A Era da Sobrevivência",
        description:
          "Facções, milícias e clãs se formam. O estado não existe mais. A lei é ditada pela força. Bases militares se tornam territórios disputados e sangrentos.",
        icon: Target,
        color: "text-gray-400",
      },
      {
        year: "2024",
        title: "A Desconexão Humana",
        description:
          "A solidão e o medo do outro se tornam as maiores ameaças. A confiança é uma moeda rara e a traição, uma constante. Comunidades vivem isoladas e em silêncio.",
        icon: HeartCrack,
        color: "text-pink-500",
      },
      {
        year: "2025",
        title: "O Novo Dia Um",
        description:
          "A civilização caiu. Cidades são ruínas tomadas pela natureza. Os infectados vagam eternamente. O B13 venceu. A humanidade não está em crise. Ela já caiu. Agora é o Novo Dia Um.",
        icon: Sunrise,
        color: "text-primary",
      },
    ],
    [],
  )

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initialization effect
  useEffect(() => {
    setIsVisible(true)
    // Gallery auto-rotation
    const galleryInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
    }, 6000)

    return () => {
      clearInterval(galleryInterval)
    }
  }, [galleryImages.length])

  // Navigation functions
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }, [galleryImages.length])

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }, [galleryImages.length])

  // Form handlers
  const handleWhitelistSubmit = useCallback(() => {
    window.open("https://forms.gle/DiJprQAfauPv6kJu8", "_blank", "noopener,noreferrer")
  }, [])

  const handleContactSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsContactLoading(true)
    setContactStatus("idle")
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setContactStatus("success")
      setTimeout(() => {
        setContactForm({ name: "", email: "", subject: "", message: "" })
        setContactStatus("idle")
      }, 4000)
    } catch (error) {
      setContactStatus("error")
    } finally {
      setIsContactLoading(false)
    }
  }, [])

  const handleDonationSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDonationLoading(true)
    setDonationStatus("idle")
    try {
      await new Promise((resolve) => setTimeout(resolve, 2500))
      setDonationStatus("success")
      setTimeout(() => {
        setDonationForm({
          amount: 10,
          package: "",
          steamId: "",
          email: "",
          message: "",
        })
        setDonationStatus("idle")
      }, 4000)
    } catch (error) {
      setDonationStatus("error")
    } finally {
      setIsDonationLoading(false)
    }
  }, [])

  // Add smooth scrolling CSS
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Modern Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm">
                <img src="/images/brazil-sa-logo.png" alt="Brazil S.A Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">Brazil S.A</span>
                <span className="text-xs text-muted-foreground font-medium">{"ROLEPLAY\n"}</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { href: "#inicio", label: "Início" },
                { href: "#servidor", label: "Servidor" },
                { href: "#lore", label: "Lore" },
                { href: "#regras", label: "Regras" },
                { href: "#galeria", label: "Galeria" },
                { href: "#contato", label: "Contato" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector(item.href)
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold px-6 hover:from-primary/90 hover:to-primary/70"
                onClick={handleWhitelistSubmit}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Aplicar Whitelist
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border/50">
            <div className="px-4 py-6 space-y-4">
              {[
                { href: "#inicio", label: "Início" },
                { href: "#servidor", label: "Servidor" },
                { href: "#lore", label: "Lore" },
                { href: "#regras", label: "Regras" },
                { href: "#galeria", label: "Galeria" },
                { href: "#contato", label: "Contato" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsMenuOpen(false)
                    setTimeout(() => {
                      const element = document.querySelector(item.href)
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        })
                      }
                    }, 100)
                  }}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-border/50">
                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold"
                  onClick={handleWhitelistSubmit}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Aplicar Whitelist
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
          style={{
            backgroundImage: "url('/images/hero-background.png')",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            transform: `scale(${1 + scrollY * 0.0002})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />

        <div
          className={`relative z-10 text-center px-4 max-w-6xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Activity className="mr-2 h-4 w-4" />
              Servidor em Preparação Final
            </Badge>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
              Brazil<span className="text-primary"> S.A</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              O servidor de DayZ RP mais imersivo e hardcore do Brasil. Prepare-se para uma experiência única de
              sobrevivência onde cada decisão importa.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold px-8 py-4 text-lg hover:from-primary/90 hover:to-primary/70"
              onClick={handleWhitelistSubmit}
            >
              <UserPlus className="mr-2 h-6 w-6" />
              Aplicar Whitelist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10 px-8 py-4 text-lg font-semibold bg-transparent"
              onClick={() => window.open("https://discord.gg/Cc9EtmVuVq", "_blank", "noopener,noreferrer")}
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              Entrar no Discord
            </Button>
          </div>

          {/* Server Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            <div className="col-span-2">
              <ServerStatus />
            </div>
            {enhancedServerStats.map((stat, index) => (
              <div
                key={index}
                className="bg-black/20 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-center hover:scale-105 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`text-lg font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-gray-400 font-medium">{stat.label}</div>
                {stat.progress && (
                  <div className="mt-2">
                    <Progress value={stat.progress} className="h-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Server Features Section */}
      <section id="servidor" className="py-24 px-4 bg-muted/30 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Server className="mr-2 h-4 w-4" />
              Características do Servidor
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Experiência Única de Roleplay
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Desenvolvido com foco na imersão total e qualidade de roleplay, oferecendo uma experiência hardcore
              autêntica em Chernarus.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serverFeatures.map((feature, index) => (
              <Card
                key={feature.id}
                className="hover:shadow-lg transition-all duration-300 group cursor-pointer border-border/50"
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors">
                    {feature.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {feature.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lore Section */}
      <section id="lore" className="py-24 px-4 scroll-mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <BookOpen className="mr-2 h-4 w-4" />
              Lore Oficial
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              A Queda da Civilização
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A história de como o vírus B13 reescreveu o destino da humanidade, ano a ano.
            </p>
          </div>

          <div className="relative timeline-container pl-12">
            {loreData.map((item, index) => (
              <div key={index} className="relative mb-10">
                <div className="absolute -left-1.5 top-1.5 flex items-center justify-center w-11 h-11 bg-background rounded-full border-2 border-border">
                  <item.icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <Card className="ml-6 hover:shadow-lg transition-shadow duration-300 border-border/80">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={`text-xl ${item.color}`}>{item.title}</CardTitle>
                      <Badge variant="outline" className="font-bold text-lg">
                        {item.year}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section id="regras" className="py-24 px-4 bg-muted/30 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <FileText className="mr-2 h-4 w-4" />
              Regras Oficiais
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              📜 Regras do Servidor Brazil S.A. RP
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Leia atentamente todas as regras antes de aplicar para a whitelist. O cumprimento das regras é obrigatório
              para todos os jogadores.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Regras Gerais */}
            <Card className="hover:shadow-lg transition-all duration-300 border-emerald-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-emerald-600">
                  🟢 1. Regras Gerais (OOC - Fora do Personagem)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "1.1. É proibido o uso de cheats, exploits, bugs, macros ou qualquer vantagem injusta.",
                  "1.2. Proibido o uso de linguagem ofensiva, preconceituosa, racista, homofóbica, ou de cunho religioso/político extremo.",
                  "1.3. Respeite todos os jogadores e a Staff. Desentendimentos devem ser resolvidos via ticket.",
                  "1.4. Proibido qualquer tipo de divulgação sem autorização da administração.",
                  "1.5. Proibido uso de modificação de arquivos do jogo (exceto os fornecidos pelo servidor).",
                  "1.6. Uso de VOIP é obrigatório em interações RP. Se não puder falar, não jogue no modo RP.",
                  "1.7. Não é permitido sair do personagem (quebrar o RP) sem motivo justificável.",
                ].map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Roleplay */}
            <Card className="hover:shadow-lg transition-all duration-300 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-yellow-600">🟡 2. Roleplay (RP)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "2.1. Você deve permanecer em personagem durante todo o tempo no servidor.",
                  '2.2. Não é permitido "PowerGaming": fazer ações impossíveis ou forçar situações absurdas.',
                  '2.3. Proibido "MetaGaming": usar informações obtidas fora do jogo (Twitch, Discord, etc).',
                  '2.4. "Combat Log" (sair do jogo em combate ou para evitar RP) é banimento direto.',
                  "2.5. Não é permitido agir de forma incoerente com a lore do servidor ou do seu personagem.",
                  "2.6. Você não pode forçar outro jogador a quebrar as regras, mesmo dentro de um RP.",
                  "2.7. Personagens femininos devem ser respeitados — qualquer atitude ofensiva será punida com severidade.",
                ].map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-yellow-50/50 dark:bg-yellow-950/20 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Combate e Hostilidade */}
            <Card className="hover:shadow-lg transition-all duration-300 border-red-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-red-600">🔴 3. Combate e Hostilidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "3.1. Antes de qualquer confronto armado, deve haver iniciação verbal clara.",
                  "3.2. O uso de voz no RP hostil é obrigatório. Atirar sem falar (KoS) é proibido fora de zonas designadas.",
                  "3.3. Permissões para tortura, execução e escravidão devem ter contexto e desenvolvimento RP coerente.",
                  '3.4. É proibido matar ou render players apenas por diversão ou loot ("Deathmatch gratuito").',
                  "3.5. Emboscadas são permitidas, desde que possuam contexto RP e sejam justificáveis.",
                  "3.6. Ataques a bases ou reféns devem ser notificados por rumores no Discord, para garantir presença dos envolvidos.",
                ].map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-red-50/50 dark:bg-red-950/20 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Bases e Construção */}
            <Card className="hover:shadow-lg transition-all duration-300 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-orange-600">
                  ⚠️ 4. Regras de Bases e Construção
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "4.1. Bases devem seguir a estética pós-apocalíptica (sem castelos, fortalezas gigantes ou bugs).",
                  "4.2. É proibido usar glitchs (como colocar baús invisíveis ou paredes flutuantes).",
                  "4.3. Cada grupo pode ter apenas uma base principal e um acampamento temporário.",
                  "4.4. Não é permitido bloquear todo o loot spawn de uma cidade (ex: encher casas de baús).",
                  "4.5. As bases devem ter pelo menos 1 entrada possível (trancada ou não), sem salto de glitch.",
                ].map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-orange-50/50 dark:bg-orange-950/20 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Saques e RAIDs */}
            <Card className="hover:shadow-lg transition-all duration-300 border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-purple-600">
                  🔐 5. Regras de Saques e RAIDs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "5.1. RAIDs só são permitidos entre grupos rivais e devem ser justificados via RP.",
                  "5.2. O horário de RAID deve seguir os acordos feitos no Discord (deixar rumores claros).",
                  "5.3. É proibido destruir toda a base ou esvaziar por completo sem motivo. Leve apenas o necessário.",
                  "5.4. Proibido trancar um personagem ou destruí-lo sem chance de defesa.",
                  "5.5. RAID solo só é permitido em bases pequenas e com lógica RP.",
                ].map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-purple-50/50 dark:bg-purple-950/20 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Veículos e Interações */}
            <Card className="hover:shadow-lg transition-all duration-300 border-blue-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-blue-600">🧠 6. Veículos e Interações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "6.1. Veículos não podem ser escondidos fora do mapa ou em locais bugados.",
                  "6.2. É proibido usar veículos para atropelar players sem motivo RP (RDM).",
                  "6.3. Não é permitido abandonar veículos travando o servidor.",
                  "6.4. Interações devem ser coerentes com a lore, mesmo com desconhecidos.",
                  "6.5. Toda ação hostil deve oferecer chance de reação ou negociação RP.",
                ].map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Denúncias e Punições */}
            <Card className="hover:shadow-lg transition-all duration-300 border-gray-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-gray-600">⚖️ 7. Denúncias e Punições</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "7.1. Denúncias devem conter prova em vídeo e horário aproximado.",
                  "7.2. Logs de combate e desconexão serão usados pela staff.",
                  "7.3. Punições variam entre advertência, ban temporário ou banimento permanente.",
                  "7.4. Reincidência reduz o tempo de defesa.",
                  "7.5. A palavra final é sempre da Administração. Abuso em tickets pode gerar punição.",
                ].map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-gray-50/50 dark:bg-gray-950/20 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Modo Hardcore */}
            <Card className="hover:shadow-lg transition-all duration-300 border-indigo-500/20">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-indigo-600">🕹️ 8. Modo Hardcore</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "8.1. Loot é escasso. Cooperação pode ser a única chance de sobrevivência.",
                  '8.2. Morte tem consequências graves. Recomece sua história ou justifique a "volta".',
                  "8.3. Cura, armas e munições devem ser usadas com lógica e escassez.",
                  "8.4. Não use o servidor como PvP arena. Este é um mundo realista e letal.",
                ].map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{rule}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Palavra-chave */}
            <Card className="hover:shadow-lg transition-all duration-300 border-primary/50 bg-gradient-to-r from-primary/5 to-primary/10">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary mb-4">✅ Palavra-chave para Whitelist</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
                  <p className="text-2xl font-bold text-primary mb-2">"SOBREVIVÊNCIA É INTERPRETAÇÃO"</p>
                  <p className="text-sm text-muted-foreground">
                    Use esta palavra-chave no formulário de whitelist para comprovar que leu todas as regras
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold px-12 py-4 text-lg hover:from-primary/90 hover:to-primary/70"
              onClick={handleWhitelistSubmit}
            >
              <UserPlus className="mr-3 h-6 w-6" />
              Aplicar para Whitelist Agora
              <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="py-24 px-4 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Eye className="mr-2 h-4 w-4" />
              Galeria de Screenshots
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Explore Chernarus
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Veja a beleza e o perigo do mundo pós-apocalíptico através das lentes dos nossos sobreviventes
            </p>
          </div>

          <div className="relative">
            <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={galleryImages[currentImageIndex]?.src || "/placeholder.svg"}
                alt={galleryImages[currentImageIndex]?.alt || `Screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center mt-8 space-x-2 overflow-x-auto pb-4">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentImageIndex
                      ? "border-primary shadow-lg shadow-primary/25 scale-110"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={image.src || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-24 px-4 bg-muted/30 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <MessageCircle className="mr-2 h-4 w-4" />
              Entre na Comunidade
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Junte-se aos Sobreviventes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece sua jornada no apocalipse mais realista do Brasil
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-background border border-border rounded-xl p-1">
              <TabsTrigger
                value="whitelist"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold rounded-lg"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Whitelist
              </TabsTrigger>
              <TabsTrigger
                value="contato"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold rounded-lg"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contato
              </TabsTrigger>
              <TabsTrigger
                value="doacoes"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-semibold rounded-lg"
              >
                <Gift className="mr-2 h-4 w-4" />
                Doações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="whitelist" className="mt-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Aplicação para Whitelist</CardTitle>
                  <CardDescription className="text-lg">
                    Preencha o formulário oficial para ser aprovado no servidor mais hardcore do Brasil
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-8">
                  <div className="bg-muted/50 rounded-xl p-8">
                    <h3 className="text-xl font-bold mb-4">Processo de Seleção Rigoroso</h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      Para garantir a máxima qualidade do roleplay hardcore, utilizamos um processo rigoroso de seleção.
                      Todas as aplicações são analisadas detalhadamente por nossa equipe especializada.
                    </p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold px-12 py-4 text-lg hover:from-primary/90 hover:to-primary/70"
                      onClick={handleWhitelistSubmit}
                    >
                      <UserPlus className="mr-3 h-6 w-6" />
                      Abrir Formulário de Whitelist
                      <ArrowRight className="ml-3 h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      className="px-8 py-3 bg-transparent"
                      onClick={() => document.getElementById("regras")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Ler Regras Primeiro
                    </Button>
                    <Button
                      variant="outline"
                      className="px-8 py-3 bg-transparent"
                      onClick={() => window.open("https://discord.gg/Cc9EtmVuVq", "_blank", "noopener,noreferrer")}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Entrar no Discord
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contato" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Globe className="mr-3 h-6 w-6 text-primary" />
                      Informações do Servidor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {[
                        { icon: Server, label: "IP do Servidor", value: "97.75.153.152:2302", copyable: true },
                        { icon: Users, label: "Capacidade", value: "60 jogadores simultâneos" },
                        {
                          icon: Clock,
                          label: "Restarts Automáticos",
                          value: "A cada 6 horas (00:00, 06:00, 12:00, 18:00)",
                        },
                        { icon: Map, label: "Mapa Oficial", value: "Chernarus (Modificado com conteúdo exclusivo)" },
                        { icon: Shield, label: "Proteção Anti-Cheat", value: "BattlEye + Sistemas Customizados" },
                        { icon: Mail, label: "Email de Contato", value: "brazils.abr@gmail.com", copyable: true },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <item.icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-sm">{item.label}</h3>
                            <p className="text-muted-foreground text-sm font-mono">{item.value}</p>
                          </div>
                          {item.copyable && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs bg-transparent"
                              onClick={() => navigator.clipboard.writeText(item.value)}
                            >
                              Copiar
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      <Button
                        className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold hover:from-primary/90 hover:to-primary/70"
                        onClick={() => window.open("https://discord.gg/Cc9EtmVuVq", "_blank", "noopener,noreferrer")}
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Entrar no Discord Oficial
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => window.open("steam://connect/97.75.153.152:2302", "_blank")}
                      >
                        <Gamepad2 className="mr-2 h-5 w-5" />
                        Conectar via Steam
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Mail className="mr-3 h-6 w-6 text-primary" />
                      Envie uma Mensagem
                    </CardTitle>
                    <CardDescription>Entre em contato conosco para dúvidas, sugestões ou suporte</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contact-name" className="font-semibold">
                            Nome Completo *
                          </Label>
                          <Input
                            id="contact-name"
                            placeholder="Seu nome ou nickname"
                            value={contactForm.name}
                            onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-email" className="font-semibold">
                            Email *
                          </Label>
                          <Input
                            id="contact-email"
                            type="email"
                            placeholder="seu@email.com"
                            value={contactForm.email}
                            onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-subject" className="font-semibold">
                          Assunto *
                        </Label>
                        <select
                          id="contact-subject"
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
                          required
                        >
                          <option value="">Selecione o assunto</option>
                          <option value="whitelist">Dúvidas sobre Whitelist</option>
                          <option value="regras">Esclarecimento de Regras</option>
                          <option value="mods">Informações sobre Mods</option>
                          <option value="bug">Reportar Bug ou Problema Técnico</option>
                          <option value="sugestao">Sugestão de Melhoria</option>
                          <option value="denuncia">Denúncia de Jogador</option>
                          <option value="parceria">Proposta de Parceria</option>
                          <option value="outro">Outro Assunto</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-message" className="font-semibold">
                          Mensagem *
                        </Label>
                        <Textarea
                          id="contact-message"
                          placeholder="Descreva sua mensagem de forma detalhada..."
                          className="min-h-[120px]"
                          value={contactForm.message}
                          onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                          required
                        />
                      </div>
                      {contactStatus === "success" && (
                        <Alert className="border-emerald-500/50 bg-emerald-500/10">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          <AlertDescription className="text-emerald-700 dark:text-emerald-300">
                            Mensagem enviada com sucesso! Nossa equipe responderá em breve.
                          </AlertDescription>
                        </Alert>
                      )}
                      {contactStatus === "error" && (
                        <Alert className="border-red-500/50 bg-red-500/10">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <AlertDescription className="text-red-700 dark:text-red-300">
                            Erro ao enviar mensagem. Verifique os dados e tente novamente.
                          </AlertDescription>
                        </Alert>
                      )}
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold py-3 hover:from-primary/90 hover:to-primary/70"
                        disabled={isContactLoading}
                      >
                        {isContactLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando Mensagem...
                          </>
                        ) : (
                          <>
                            <Mail className="mr-2 h-5 w-5" />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="doacoes" className="mt-8">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">Apoie o Servidor</CardTitle>
                  <CardDescription className="text-lg">
                    Ajude a manter o servidor funcionando com a máxima qualidade
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-muted/50 rounded-xl p-8">
                    <h3 className="text-xl font-bold mb-4">Sistema de Doações em Desenvolvimento</h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      Estamos preparando um sistema completo de doações com pacotes exclusivos e benefícios especiais.
                      Em breve você poderá apoiar o servidor e receber recompensas únicas.
                    </p>
                    <Button
                      size="lg"
                      variant="outline"
                      className="px-12 py-4 text-lg font-semibold bg-transparent"
                      onClick={() => window.open("https://discord.gg/brazilsarp", "_blank", "noopener,noreferrer")}
                    >
                      <MessageCircle className="mr-3 h-6 w-6" />
                      Fique por Dentro no Discord
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Enhanced Footer Section */}
      <footer className="relative py-16 px-4 border-t border-border/50 bg-gradient-to-b from-muted/20 to-muted/40 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.1)_25%,rgba(120,119,198,0.1)_50%,transparent_50%,transparent_75%,rgba(120,119,198,0.1)_75%)] bg-[length:20px_20px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Servidor Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-primary/10 backdrop-blur-sm border border-primary/20">
                  <img
                    src="/images/brazil-sa-logo.png"
                    alt="Brazil S.A Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Brazil S.A</h3>
                  <p className="text-xs text-muted-foreground font-medium">ROLEPLAY SERVER</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                O servidor de DayZ RP mais imersivo e hardcore do Brasil. Uma experiência única de sobrevivência onde
                cada decisão importa.
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Activity className="h-4 w-4 text-primary" />
                <span>Servidor em Preparação Final</span>
              </div>
            </div>

            {/* Links Rápidos */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-primary" />
                Links Rápidos
              </h4>
              <div className="space-y-3">
                {[
                  {
                    label: "Aplicar Whitelist",
                    action: handleWhitelistSubmit,
                    icon: UserPlus,
                  },
                  {
                    label: "Regras do Servidor",
                    action: () => document.getElementById("regras")?.scrollIntoView({ behavior: "smooth" }),
                    icon: Shield,
                  },
                  {
                    label: "Galeria de Screenshots",
                    action: () => document.getElementById("galeria")?.scrollIntoView({ behavior: "smooth" }),
                    icon: Eye,
                  },
                  {
                    label: "Entrar em Contato",
                    action: () => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" }),
                    icon: MessageCircle,
                  },
                ].map((link, index) => (
                  <button
                    key={index}
                    onClick={link.action}
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  >
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{link.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Informações do Servidor */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <Server className="mr-2 h-5 w-5 text-primary" />
                Servidor
              </h4>
              <div className="space-y-3">
                {[
                  { icon: Globe, label: "IP", value: "97.75.153.152:2302" },
                  { icon: Users, label: "Slots", value: "60 Jogadores" },
                  { icon: Map, label: "Mapa", value: "Chernarus" },
                  { icon: Zap, label: "Modo", value: "Hardcore RP" },
                ].map((info, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <info.icon className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs text-muted-foreground">{info.label}:</span>
                      <p className="text-sm font-medium text-foreground">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comunidade */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                Comunidade
              </h4>
              <div className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold hover:from-primary/90 hover:to-primary/70"
                  onClick={() => window.open("https://discord.gg/Cc9EtmVuVq", "_blank", "noopener,noreferrer")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Discord Oficial
                </Button>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Contato:</p>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm font-mono text-foreground">brazils.abr@gmail.com</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Status:</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="text-sm text-foreground">Em Preparação</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground">
                  © 2025 <span className="font-semibold text-foreground">Brazil S.A.</span> Todos os direitos
                  reservados.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Servidor Oficial da Comunidade Brazil S.A. RP | Não afiliado à Bohemia Interactive
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Desenvolvido por <span className="font-semibold text-foreground">Yuri Kristofer</span>
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-xs text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  <span>Whitelist Ativa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>15+ Mods</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-purple-500" />
                  <span>Eventos Semanais</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">SOBREVIVÊNCIA É INTERPRETAÇÃO</span>
              <Target className="h-4 w-4 text-primary" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
