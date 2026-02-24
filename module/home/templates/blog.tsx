import { ArrowRight } from "lucide-react"
import BlogCard from "../components/blog-card"
import Button from "@/ui/button"
import SectionHeader from "../components/section-header"
import { blogData } from "@lib/constant/blog"

export default function Blog() {
    return (
        <SectionHeader title="Blogs & Articles" desc="Discover fashion insights, style tips, guides and the latest trends here." sectionName="blog-article">

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {blogData.slice(0, 4).map(post => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
            <div className="flex justify-center">
                <Button href="/blog" variant="outline" icon={<ArrowRight className="size-5" />} iconPosition="right" className="mt-4">
                    <span>View All Articles</span>

                </Button>
            </div>
        </SectionHeader>
    )
}