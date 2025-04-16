import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { GithubIcon, ShirtIcon, UserIcon, BrainCircuitIcon, PaletteIcon, LinkedinIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            StyleMind
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tu asistente personal de moda que combina inteligencia artificial con tu estilo único
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/auth/register">Comenzar Ahora</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Características Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <ShirtIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Armario Digital</h3>
              <p className="text-muted-foreground">
                Organiza tu ropa digitalmente y ten acceso a todo tu guardarropa desde cualquier lugar
              </p>
            </Card>
            <Card className="p-6">
              <BrainCircuitIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">IA Inteligente</h3>
              <p className="text-muted-foreground">
                Recibe recomendaciones personalizadas basadas en tu estilo y preferencias
              </p>
            </Card>
            <Card className="p-6">
              <PaletteIcon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Combinaciones Únicas</h3>
              <p className="text-muted-foreground">
                Descubre nuevas combinaciones de ropa que se adapten a tu estilo personal
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Sobre Nosotros</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Somos un equipo apasionado por la tecnología y la moda, comprometidos con hacer que la elección 
            de tu outfit diario sea más fácil e inteligente.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold mb-6">Nuestro Equipo</h3>
              <div className="grid gap-6">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold">Iván Manzaba</h4>
                      <p className="text-sm text-muted-foreground mb-2">Desarrollador Full Stack</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Especializado en arquitectura de software y desarrollo de APIs RESTful
                      </p>
                      <div className="flex gap-3">
                        <a 
                          href="https://github.com/IvanM9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <GithubIcon className="w-5 h-5" />
                        </a>
                        <a 
                          href="https://linkedin.com/in/iván-manzaba"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <LinkedinIcon className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold">Josue Jouvin</h4>
                      <p className="text-sm text-muted-foreground mb-2">Desarrollador Full Stack</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Experto en desarrollo frontend y experiencia de usuario
                      </p>
                      <div className="flex gap-3">
                        <a 
                          href="https://github.com/josueJouvin"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <GithubIcon className="w-5 h-5" />
                        </a>
                        <a 
                          href=""
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <LinkedinIcon className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-semibold mb-6">Proyecto</h3>
              <div className="space-y-6">
                <Card className="p-6">
                  <h4 className="text-lg font-semibold mb-4">Tecnologías Utilizadas</h4>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>Next.js</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>TypeScript</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>TailwindCSS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>NestJS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>Vercel AI SDK</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                      <span>PostgreSQL</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h4 className="text-lg font-semibold mb-4">Repositorios</h4>
                  <div className="space-y-4">
                    <a 
                      href="https://github.com/codecbros/StyleMind_Frontend"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <GithubIcon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Frontend Repository</p>
                        <p className="text-sm text-muted-foreground">Interfaz de usuario con Next.js</p>
                      </div>
                    </a>
                    <a 
                      href="https://github.com/codecbros/StyleMind_Backend"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <GithubIcon className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Backend Repository</p>
                        <p className="text-sm text-muted-foreground">API y lógica de negocio con NestJs</p>
                      </div>
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container px-4 mx-auto text-center text-muted-foreground">
          <p>© 2025 StyleMind. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
