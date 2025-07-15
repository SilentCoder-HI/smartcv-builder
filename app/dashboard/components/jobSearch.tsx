"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Building,
  Bookmark,
  ExternalLink,
  Filter,
  Sparkles,
  FileText,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Full-time" | "Part-time" | "Contract" | "Remote"
  salary: string
  description: string
  requirements: string[]
  postedDate: string
  matchScore?: number
  saved: boolean
  applicationUrl: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $180k",
      description:
        "We are looking for a Senior Software Engineer to join our growing team. You will be responsible for designing and implementing scalable web applications using modern technologies.",
      requirements: ["5+ years of experience", "React/Node.js expertise", "AWS knowledge", "Team leadership skills"],
      postedDate: "2 days ago",
      matchScore: 95,
      saved: false,
      applicationUrl: "https://techcorp.com/careers/senior-engineer",
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "Remote",
      type: "Full-time",
      salary: "$80k - $120k",
      description:
        "Join our dynamic startup as a Frontend Developer. You will work on cutting-edge user interfaces and collaborate with our design team to create amazing user experiences.",
      requirements: ["3+ years React experience", "TypeScript proficiency", "UI/UX understanding", "Agile methodology"],
      postedDate: "1 day ago",
      matchScore: 88,
      saved: true,
      applicationUrl: "https://startupxyz.com/jobs/frontend-dev",
    },
    {
      id: "3",
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90k - $140k",
      description:
        "We need a versatile Full Stack Developer to work on various client projects. You will be involved in both frontend and backend development using modern web technologies.",
      requirements: ["Full stack experience", "JavaScript/Python", "Database design", "API development"],
      postedDate: "3 days ago",
      matchScore: 82,
      saved: false,
      applicationUrl: "https://digitalsolutions.com/careers/fullstack",
    },
    {
      id: "4",
      title: "React Developer",
      company: "WebFlow Agency",
      location: "Austin, TX",
      type: "Contract",
      salary: "$60 - $80/hour",
      description:
        "Contract position for an experienced React Developer to work on multiple client projects. Flexible schedule and remote work options available.",
      requirements: ["Expert React skills", "Redux/Context API", "Testing frameworks", "Git workflow"],
      postedDate: "5 days ago",
      matchScore: 90,
      saved: false,
      applicationUrl: "https://webflowagency.com/contract-react",
    },
    {
      id: "5",
      title: "Software Engineering Manager",
      company: "Enterprise Corp",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$150k - $220k",
      description:
        "Lead a team of talented engineers while contributing to technical decisions and architecture. Perfect role for a senior engineer looking to move into management.",
      requirements: ["8+ years experience", "Team management", "Technical leadership", "Agile/Scrum"],
      postedDate: "1 week ago",
      matchScore: 75,
      saved: true,
      applicationUrl: "https://enterprisecorp.com/jobs/eng-manager",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("Full-time") // Updated default value
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())
    const matchesType = !typeFilter || job.type === typeFilter

    return matchesSearch && matchesLocation && matchesType
  })

  const handleSaveJob = (jobId: string) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, saved: !job.saved } : job)))
  }

  const handleApply = (job: Job) => {
    // This would typically track the application and redirect
    window.open(job.applicationUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 py-5 pr-5">
      <div className="container mx-auto">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs, companies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10 w-full md:w-48"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {showFilters && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Advanced Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Salary Range</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-50k">$0 - $50k</SelectItem>
                        <SelectItem value="50k-100k">$50k - $100k</SelectItem>
                        <SelectItem value="100k-150k">$100k - $150k</SelectItem>
                        <SelectItem value="150k+">$150k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Experience Level</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="lead">Lead/Principal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Company Size</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup (1-50)</SelectItem>
                        <SelectItem value="small">Small (51-200)</SelectItem>
                        <SelectItem value="medium">Medium (201-1000)</SelectItem>
                        <SelectItem value="large">Large (1000+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                    </CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleSaveJob(job.id)}>
                    <Bookmark className={`h-4 w-4 ${job.saved ? "fill-current text-blue-600" : ""}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{job.type}</Badge>
                      <span className="flex items-center text-green-600">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </span>
                    </div>
                    <span className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.postedDate}
                    </span>
                  </div>

                  {job.matchScore && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">CV Match Score:</span>
                      <Badge variant="outline" className="text-green-600">
                        <Sparkles className="h-3 w-3 mr-1" />
                        {job.matchScore}%
                      </Badge>
                    </div>
                  )}

                  <p className="text-sm text-gray-600 line-clamp-3">{job.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                    {job.requirements.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{job.requirements.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{job.title}</DialogTitle>
                          <DialogDescription>
                            {job.company} • {job.location} • {job.type}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-semibold text-green-600">{job.salary}</span>
                            {job.matchScore && (
                              <Badge variant="outline" className="text-green-600">
                                <Sparkles className="h-3 w-3 mr-1" />
                                {job.matchScore}% Match
                              </Badge>
                            )}
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Job Description</h4>
                            <p className="text-gray-700">{job.description}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Requirements</h4>
                            <ul className="space-y-1">
                              {job.requirements.map((req, index) => (
                                <li key={index} className="text-gray-700 flex items-center">
                                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex space-x-2 pt-4">
                            <Button onClick={() => handleApply(job)} className="flex-1">
                              Apply Now
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                            <Button variant="outline" onClick={() => handleSaveJob(job.id)}>
                              <Bookmark className={`h-4 w-4 ${job.saved ? "fill-current" : ""}`} />
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button size="sm" onClick={() => handleApply(job)}>
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setLocationFilter("")
                setTypeFilter("Full-time") // Updated default value
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* AI Job Matching Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
              AI Job Matching
            </CardTitle>
            <CardDescription>Get personalized job recommendations based on your CV and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  We found {filteredJobs.filter((job) => job.matchScore && job.matchScore > 80).length} high-match jobs
                  for your profile
                </p>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="text-green-600">
                    95% Average Match Score
                  </Badge>
                  <Badge variant="outline">{jobs.filter((job) => job.saved).length} Saved Jobs</Badge>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Update CV
                  </Button>
                </Link>
                <Button size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Get More Matches
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
