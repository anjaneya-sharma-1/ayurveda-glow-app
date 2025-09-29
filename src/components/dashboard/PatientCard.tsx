import { Calendar, MapPin, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DoshaWheel } from "./DoshaWheel";

interface PatientCardProps {
  id: string;
  name: string;
  age: number;
  gender: string;
  prakriti: string;
  lastConsultation: string;
  doshaBalance: {
    vata: number;
    pitta: number;
    kapha: number;
  };
  status: "active" | "inactive" | "attention";
  location?: string;
  onClick?: () => void;
}

export function PatientCard({
  id,
  name,
  age,
  gender,
  prakriti,
  lastConsultation,
  doshaBalance,
  status,
  location,
  onClick
}: PatientCardProps) {
  const statusColors = {
    active: "bg-success text-success-foreground",
    inactive: "bg-muted text-muted-foreground",
    attention: "bg-warning text-warning-foreground"
  };

  const statusLabels = {
    active: "Active",
    inactive: "Inactive",
    attention: "Needs Attention"
  };

  return (
    <Card 
      className="hover-lift cursor-pointer bg-card border-border transition-smooth group"
      onClick={onClick}
    >
      <CardContent className="p-6">
        {/* Header with name and status */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-smooth">
              {name}
            </h3>
            <div className="text-sm text-muted-foreground mt-1">
              {age} years, {gender}
            </div>
          </div>
          <Badge className={`${statusColors[status]} whitespace-nowrap`}>
            {statusLabels[status]}
          </Badge>
        </div>

        {/* Main content area */}
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">Prakriti:</span>
              <span className="text-sm text-foreground">{prakriti}</span>
            </div>
            {location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            )}
            {/* Dosha percentages inline */}
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'hsl(var(--vata-color))'}}></div>
                <span className="text-sm font-medium" style={{color: 'hsl(var(--vata-color))'}}>V</span>
                <span className="text-sm text-muted-foreground">{doshaBalance.vata}%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'hsl(var(--pitta-color))'}}></div>
                <span className="text-sm font-medium" style={{color: 'hsl(var(--pitta-color))'}}>P</span>
                <span className="text-sm text-muted-foreground">{doshaBalance.pitta}%</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'hsl(var(--kapha-color))'}}></div>
                <span className="text-sm font-medium" style={{color: 'hsl(var(--kapha-color))'}}>K</span>
                <span className="text-sm text-muted-foreground">{doshaBalance.kapha}%</span>
              </div>
            </div>
          </div>
          
          {/* Dosha wheel on the right */}
          <div className="flex-shrink-0">
            <DoshaWheel 
              vata={doshaBalance.vata}
              pitta={doshaBalance.pitta}
              kapha={doshaBalance.kapha}
              size="sm"
            />
          </div>
        </div>
        
        {/* Footer with last visit and action */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last visit: {lastConsultation}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors">
            <Activity className="w-4 h-4" />
            <span>View Details</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}