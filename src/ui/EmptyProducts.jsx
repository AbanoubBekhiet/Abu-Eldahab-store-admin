import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { PackageSearch } from "lucide-react";

export default function EmptyProducts() {
	return (
		<div className="flex h-[50vh]">
			<Empty className="border border-dashed ">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<PackageSearch />
					</EmptyMedia>
					<EmptyTitle>لا يوجد نتائج للبحث</EmptyTitle>
					<EmptyDescription>اعد البحث مجدداً</EmptyDescription>
				</EmptyHeader>
			</Empty>
		</div>
	);
}
