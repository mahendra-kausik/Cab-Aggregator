// Geocoding service for address resolution
export interface GeocodingResult {
  address: string;
  coordinates: [number, number];
  displayName: string;
}

class GeocodingService {
  private mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  private get isValidMapboxToken(): boolean {
    return this.mapboxToken &&
      this.mapboxToken.startsWith('pk.') &&
      this.mapboxToken !== 'your_mapbox_token_here' &&
      this.mapboxToken !== 'pk.your_mapbox_access_token_here';
  }

  /**
   * Reverse geocode coordinates to address
   */
  async reverseGeocode(coordinates: [number, number]): Promise<string> {
    const [lng, lat] = coordinates;

    try {
      // Try Mapbox first if valid token is available
      if (this.isValidMapboxToken) {
        return await this.mapboxReverseGeocode(lng, lat);
      } else {
        return await this.nominatimReverseGeocode(lng, lat);
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      // Fallback to coordinates display
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  }

  /**
   * Forward geocode address to coordinates
   */
  async forwardGeocode(address: string): Promise<GeocodingResult[]> {
    try {
      // Try Mapbox first if valid token is available
      if (this.isValidMapboxToken) {
        return await this.mapboxForwardGeocode(address);
      } else {
        return await this.nominatimForwardGeocode(address);
      }
    } catch (error) {
      console.error('Forward geocoding error:', error);
      return [];
    }
  }

  /**
   * Mapbox reverse geocoding
   */
  private async mapboxReverseGeocode(lng: number, lat: number): Promise<string> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${this.mapboxToken}&types=address,poi`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      return data.features[0].place_name;
    }

    throw new Error('No address found');
  }

  /**
   * Nominatim (OpenStreetMap) reverse geocoding
   */
  private async nominatimReverseGeocode(lng: number, lat: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CabAggregator/1.0'
      }
    });
    const data = await response.json();

    if (data.display_name) {
      return data.display_name;
    }

    throw new Error('No address found');
  }

  /**
   * Mapbox forward geocoding
   */
  private async mapboxForwardGeocode(address: string): Promise<GeocodingResult[]> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${this.mapboxToken}&limit=5`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      return data.features.map((feature: any) => ({
        address: feature.place_name,
        coordinates: feature.center as [number, number],
        displayName: feature.place_name
      }));
    }

    return [];
  }

  /**
   * Nominatim (OpenStreetMap) forward geocoding
   */
  private async nominatimForwardGeocode(address: string): Promise<GeocodingResult[]> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=5&addressdetails=1`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'CabAggregator/1.0'
      }
    });
    const data = await response.json();

    if (data && data.length > 0) {
      return data.map((item: any) => ({
        address: item.display_name,
        coordinates: [parseFloat(item.lon), parseFloat(item.lat)] as [number, number],
        displayName: item.display_name
      }));
    }

    return [];
  }

  /**
   * Calculate distance between two points (Haversine formula)
   */
  calculateDistance(coord1: [number, number], coord2: [number, number]): number {
    const [lng1, lat1] = coord1;
    const [lng2, lat2] = coord2;

    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1);
    const dLng = this.toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
}

export const geocodingService = new GeocodingService();