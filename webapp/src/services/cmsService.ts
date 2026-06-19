import type { LprVendor, OtherSurveillanceDevice } from "@/types";
import axios from "axios";

const CMS_BASE_URL = "https://cms.deflock.me";

const cmsApiService = axios.create({
	baseURL: CMS_BASE_URL,
	timeout: 10000,
});

export const cmsService = {
	async getLprVendors(): Promise<LprVendor[]> {
		try {
			const response = await cmsApiService.get("/items/lprVendors");
			return response.data.data as LprVendor[];
		} catch (error) {
			console.error("Error fetching LPR vendors:", error);
			throw new Error("Failed to fetch LPR vendors");
		}
	},
	async getOtherSurveillanceDevices(): Promise<OtherSurveillanceDevice[]> {
		try {
			const response = await cmsApiService.get("/items/nonLprVendors");
			return response.data.data as OtherSurveillanceDevice[];
		} catch (error) {
			console.error("Error fetching other surveillance devices:", error);
			throw new Error("Failed to fetch other surveillance devices");
		}
	}
};
