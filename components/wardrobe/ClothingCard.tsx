import { WardrobeItem } from "@/types"
import { Card, CardContent,  CardHeader } from "../ui/card";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Badge } from "../ui/badge";

type ClothingCardProps = {
  item: WardrobeItem
}

const seasonStyles: Record<string, { color: string; bgColor: string }> = {
  Primavera: { color: "text-green-700", bgColor: "bg-green-100" },
  Verano: { color: "text-yellow-700", bgColor: "bg-yellow-100" },
  Otoño: { color: "text-orange-700", bgColor: "bg-orange-100" },
  Invierno: { color: "text-blue-700", bgColor: "bg-blue-100" },
}

export const ClothingCard = ({item}: ClothingCardProps) => {

  const seasonStyle = seasonStyles[item.season] || { color: "text-gray-700", bgColor: "bg-gray-100" }

  console.log(item.images[0].url)
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden group hover:shadow-lg transition-shadow duration-300 p-0">
      <CardHeader className="p-0 relative">
        {/* Carrusel de imágenes */}
        <Carousel className="w-full">
          <CarouselContent>
            {item.images.map((image) => (
              <CarouselItem key={image.id}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={image.url}
                    alt={`${item.name}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {item.images.length > 1 && (
            <>
              <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </Carousel>

        {/* Badge de temporada */}
        <div className="absolute top-3 left-3">
          <Badge variant="outline"  className={`${seasonStyle.bgColor} ${seasonStyle.color} border-0`}>
            <Calendar className="h-3 w-3 mr-1" />
            {item.season}
          </Badge>
        </div>

        {/* Botones superiores */}
        <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white">
            <Pencil className="h-4 w-4 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white/80 hover:bg-white">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {/* Nombre de la prenda */}
        <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>

        {/* Color primario */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: item.primaryColor.toLowerCase() }} />
          <span className="text-sm">{item.primaryColor}</span>
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap gap-1">
          {item.categories.map( cat => (
            <Badge  key={cat.category.name} variant="secondary">
              {cat.category.name}
            </Badge>
          ))}
        </div>

        {/* Descripción */}
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </CardContent>
    </Card>
  )
}
