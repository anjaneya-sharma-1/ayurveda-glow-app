import { useState } from "react";
import { Book, Search, Play, Download, Star, Clock, User, Tag, ChevronRight, BookOpen, Scroll, Video, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LibraryItem {
  id: string;
  title: string;
  type: "article" | "video" | "ebook" | "audio" | "research";
  category: "fundamentals" | "diagnosis" | "treatment" | "herbs" | "diet" | "lifestyle" | "philosophy";
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  author: string;
  rating: number;
  description: string;
  tags: string[];
  featured: boolean;
  thumbnail: string;
  publishDate: string;
  readTime?: string;
  downloads?: number;
  youtubeId?: string; // Add YouTube video ID for embeddable videos
}

const libraryContent: LibraryItem[] = [
  {
    id: "1",
    title: "Understanding the Three Doshas: Complete Guide",
    type: "article",
    category: "fundamentals",
    level: "beginner",
    duration: "15 min read",
    author: "Dr. Priya Sharma",
    rating: 4.9,
    description: "A comprehensive introduction to Vata, Pitta, and Kapha doshas, their characteristics, and how they influence health and disease. Perfect for beginners starting their Ayurveda journey.",
    tags: ["doshas", "basic concepts", "constitution", "health"],
    featured: true,
    thumbnail: "📚",
    publishDate: "2024-01-15",
    readTime: "15 mins"
  },
  {
    id: "2", 
    title: "Ultimate Ayurvedic Body Test - Know Your Dosha Type",
    type: "video",
    category: "fundamentals",
    level: "beginner",
    duration: "10 mins 43 secs",
    author: "Fit Tuber",
    rating: 4.8,
    description: "Ultimate Ayurvedic Body Type Test. Know your body type in 5 minutes. Vata, Pitta or Kapha, which dosha dominates you and how to balance it with practical tips and diet recommendations.",
    tags: ["dosha test", "body type", "assessment", "vata", "pitta", "kapha"],
    featured: true,
    thumbnail: "🎥",
    publishDate: "2024-02-20",
    youtubeId: "wtVsFfFeYNs"
  },
  {
    id: "3",
    title: "Ayurvedic Cooking for Dosha Balance",
    type: "ebook",
    category: "diet",
    level: "intermediate",
    duration: "120 pages",
    author: "Chef Anita Patel",
    rating: 4.7,
    description: "200+ traditional recipes organized by dosha type. Includes meal planning guides, spice combinations, and seasonal eating recommendations based on Ayurvedic principles.",
    tags: ["cooking", "recipes", "meal planning", "nutrition"],
    featured: false,
    thumbnail: "📖",
    publishDate: "2024-01-30",
    downloads: 1247
  },
  {
    id: "4",
    title: "Daily Dinacharya: Ayurvedic Lifestyle Practices",
    type: "audio",
    category: "lifestyle",
    level: "beginner",
    duration: "45 mins",
    author: "Dr. Sunita Joshi",
    rating: 4.6,
    description: "Guided audio series on establishing healthy daily routines according to Ayurvedic principles. Covers morning rituals, meal timing, and evening practices.",
    tags: ["dinacharya", "daily routine", "lifestyle", "habits"],
    featured: false,
    thumbnail: "🎧",
    publishDate: "2024-03-10"
  },
  {
    id: "5",
    title: "Modern Research on Ashwagandha: Clinical Studies",
    type: "research",
    category: "herbs",
    level: "advanced",
    duration: "25 studies",
    author: "Research Collaborative",
    rating: 4.9,
    description: "Compilation of peer-reviewed studies on Ashwagandha's effects on stress, immunity, and cognitive function. Bridges traditional knowledge with modern scientific validation.",
    tags: ["ashwagandha", "research", "clinical studies", "evidence"],
    featured: true,
    thumbnail: "🔬",
    publishDate: "2024-02-05"
  },
  {
    id: "6",
    title: "Panchakosha: The Five Layers of Human Existence",
    type: "article",
    category: "philosophy",
    level: "intermediate",
    duration: "20 min read",
    author: "Swami Dharmananda",
    rating: 4.5,
    description: "Explore the philosophical foundations of Ayurveda through the concept of Panchakosha - the five sheaths that comprise human existence and their relevance to holistic health.",
    tags: ["philosophy", "panchakosha", "spirituality", "holistic health"],
    featured: false,
    thumbnail: "🕉️",
    publishDate: "2024-01-08",
    readTime: "20 mins"
  },
  {
    id: "7",
    title: "Introduction to Ayurveda - The Three Doshas",
    type: "video",
    category: "fundamentals",
    level: "beginner",
    duration: "53 minutes",
    author: "Purple Valley Ashtanga Yoga",
    rating: 4.8,
    description: "Comprehensive introduction to Ayurveda and the three doshas (Vata, Pitta, Kapha). Learn the fundamental principles of Ayurvedic medicine and how doshas affect your health and wellbeing.",
    tags: ["ayurveda basics", "three doshas", "fundamentals", "health"],
    featured: false,
    thumbnail: "🌿",
    publishDate: "2024-03-15",
    youtubeId: "XozF9VBLEfU"
  },
  {
    id: "8",
    title: "Seasonal Eating Guide: Ritucharya",
    type: "ebook",
    category: "diet",
    level: "beginner",
    duration: "80 pages",
    author: "Dr. Kavita Mehta",
    rating: 4.6,
    description: "Complete guide to eating according to the seasons in Ayurveda. Includes seasonal food charts, recipes, and lifestyle adjustments for optimal health year-round.",
    tags: ["seasonal eating", "ritucharya", "diet", "seasonal health"],
    featured: false,
    thumbnail: "🍂",
    publishDate: "2024-02-28",
    downloads: 892
  }
];

const typeIcons = {
  article: FileText,
  video: Video,
  ebook: BookOpen,
  audio: Play,
  research: Scroll
};

const levelColors = {
  beginner: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
  intermediate: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
  advanced: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" }
};

export default function AyurvedicLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedVideo, setSelectedVideo] = useState<LibraryItem | null>(null);

  const filteredContent = libraryContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === "all" || item.type === selectedType;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesLevel = selectedLevel === "all" || item.level === selectedLevel;

    return matchesSearch && matchesType && matchesCategory && matchesLevel;
  });

  const featuredContent = libraryContent.filter(item => item.featured);

  // Function to handle video playback
  const handleVideoPlay = (item: LibraryItem) => {
    if (item.type === 'video' && item.youtubeId) {
      setSelectedVideo(item);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* YouTube Video Player Modal */}
        {selectedVideo && selectedVideo.youtubeId && (
          <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  {selectedVideo.title}
                </DialogTitle>
              </DialogHeader>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">by {selectedVideo.author} • {selectedVideo.duration}</p>
                <p className="text-sm text-gray-700">{selectedVideo.description}</p>
                <div className="flex flex-wrap gap-1">
                  {selectedVideo.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Ayurvedic Knowledge Library</h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Discover the wisdom of Ayurveda through our curated collection of articles, videos, research papers, 
            and traditional texts. From beginner guides to advanced practices, explore knowledge that bridges 
            ancient wisdom with modern understanding.
          </p>
        </div>

        {/* Featured Content */}
        {featuredContent.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Featured Content
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredContent.map((item) => {
                const TypeIcon = typeIcons[item.type];
                const levelColor = levelColors[item.level];
                return (
                  <Card key={item.id} className="hover:shadow-lg transition-all group cursor-pointer border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{item.thumbnail}</span>
                          <div>
                            <CardTitle className="text-lg line-clamp-2 group-hover:text-green-700">
                              {item.title}
                            </CardTitle>
                            <p className="text-sm text-gray-600">by {item.author}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <TypeIcon className="w-5 h-5 text-green-600" />
                          <Badge className={`${levelColor.bg} ${levelColor.text} text-xs`}>
                            {item.level}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {item.rating}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleVideoPlay(item)}
                      >
                        <ChevronRight className="w-4 h-4 mr-2" />
                        {item.type === 'video' ? 'Watch Now' : 
                         item.type === 'audio' ? 'Listen Now' :
                         item.type === 'ebook' ? 'Download' : 'Read Now'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Search and Filter Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search & Filter Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search titles, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Content Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="ebook">E-books</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="fundamentals">Fundamentals</SelectItem>
                  <SelectItem value="diagnosis">Diagnosis</SelectItem>
                  <SelectItem value="treatment">Treatment</SelectItem>
                  <SelectItem value="herbs">Herbs</SelectItem>
                  <SelectItem value="diet">Diet & Nutrition</SelectItem>
                  <SelectItem value="lifestyle">Lifestyle</SelectItem>
                  <SelectItem value="philosophy">Philosophy</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All Content</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="ebook">E-books</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => {
                const TypeIcon = typeIcons[item.type];
                const levelColor = levelColors[item.level];
                return (
                  <Card key={item.id} className="hover:shadow-lg transition-all group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.thumbnail}</span>
                          <div className="flex-1">
                            <CardTitle className="text-base line-clamp-2 group-hover:text-green-700">
                              {item.title}
                            </CardTitle>
                            <p className="text-sm text-gray-600">by {item.author}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <TypeIcon className="w-4 h-4 text-green-600" />
                          <Badge className={`${levelColor.bg} ${levelColor.text} text-xs`}>
                            {item.level}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {item.rating}
                          </div>
                          {item.downloads && (
                            <div className="flex items-center gap-1">
                              <Download className="w-3 h-3" />
                              {item.downloads}
                            </div>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full text-sm"
                        onClick={() => handleVideoPlay(item)}
                      >
                        {item.type === 'video' ? 'Watch' : 
                         item.type === 'audio' ? 'Listen' :
                         item.type === 'ebook' ? 'Download' : 'Read'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Individual type tabs - similar structure */}
          {["article", "video", "ebook", "audio", "research"].map(type => (
            <TabsContent key={type} value={type} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.filter(item => item.type === type).map((item) => {
                  const TypeIcon = typeIcons[item.type];
                  const levelColor = levelColors[item.level];
                  return (
                    <Card key={item.id} className="hover:shadow-lg transition-all group cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.thumbnail}</span>
                            <div className="flex-1">
                              <CardTitle className="text-base line-clamp-2 group-hover:text-green-700">
                                {item.title}
                              </CardTitle>
                              <p className="text-sm text-gray-600">by {item.author}</p>
                            </div>
                          </div>
                          <Badge className={`${levelColor.bg} ${levelColor.text} text-xs`}>
                            {item.level}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-3">
                        <p className="text-sm text-gray-700 line-clamp-3">
                          {item.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              {item.rating}
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full text-sm"
                          onClick={() => handleVideoPlay(item)}
                        >
                          {item.type === 'video' ? 'Watch Now' : 
                           item.type === 'audio' ? 'Listen Now' :
                           item.type === 'ebook' ? 'Download' : 'Read Now'}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Empty State */}
        {filteredContent.length === 0 && (
          <Card className="text-center py-12 mt-8">
            <CardContent>
              <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters to find the content you're looking for.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
                setSelectedCategory("all");
                setSelectedLevel("all");
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Contribute to Our Library</h2>
            <p className="text-lg mb-6 text-green-100">
              Share your knowledge and help grow the Ayurvedic community. Submit articles, research, or educational content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <Book className="w-5 h-5 mr-2" />
                Submit Content
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-green-600">
                <User className="w-5 h-5 mr-2" />
                Become a Contributor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}