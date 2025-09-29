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
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-smooth">
                {name}
              </h3>
              <Badge className={`text-xs ${statusColors[status]}`}>
                {statusLabels[status]}
              </Badge>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>{age} years, {gender}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-primary">Prakriti:</span>
                <span>{prakriti}</span>
              </div>
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <DoshaWheel 
              vata={doshaBalance.vata}
              pitta={doshaBalance.pitta}
              kapha={doshaBalance.kapha}
              size="sm"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last visit: {lastConsultation}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-primary">
            <Activity className="w-4 h-4" />
            <span>View Details</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}