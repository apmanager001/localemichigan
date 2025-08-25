import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city") || "Detroit";
    const keyword = searchParams.get("keyword") || "";
    const timeframe = searchParams.get("timeframe") || "1month";
    const size = searchParams.get("size") || "20";

    const ticketmasterApiKey = process.env.TICKETMASTER_KEY;
    if (!ticketmasterApiKey) {
      return NextResponse.json(
        { error: "Ticketmaster API key not configured" },
        { status: 500 }
      );
    }

    // Build the search query
    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${ticketmasterApiKey}&countryCode=US&stateCode=MI&size=${size}`;

    if (city && city !== "All") {
      url += `&city=${encodeURIComponent(city)}`;
    }

    if (keyword) {
      url += `&keyword=${encodeURIComponent(keyword)}`;
    }

    // Add date filtering based on timeframe
    const now = new Date();
    let startDate = now.toISOString().split("T")[0]; // Today in YYYY-MM-DD format

    let endDate;
    switch (timeframe) {
      case "1month":
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
          .toISOString()
          .split("T")[0];
        break;
      case "3months":
        endDate = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate())
          .toISOString()
          .split("T")[0];
        break;
      case "6months":
        endDate = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate())
          .toISOString()
          .split("T")[0];
        break;
      case "1year":
        endDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
          .toISOString()
          .split("T")[0];
        break;
      case "all":
      default:
        endDate = new Date(now.getFullYear() + 5, now.getMonth(), now.getDate())
          .toISOString()
          .split("T")[0];
        break;
    }

    url += `&startDateTime=${startDate}T00:00:00Z&endDateTime=${endDate}T23:59:59Z`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Ticketmaster API responded with status: ${response.status}`
      );
    }

    const data = await response.json();

    // Transform the data to be more user-friendly
    const events =
      data._embedded?.events?.map((event) => ({
        id: event.id,
        name: event.name,
        url: event.url,
        date: event.dates?.start?.localDate,
        time: event.dates?.start?.localTime,
        timezone: event.dates?.timezone,
        status: event.dates?.status?.code,
        priceRange: event.priceRanges?.[0],
        venue: event._embedded?.venues?.[0]
          ? {
              name: event._embedded.venues[0].name,
              city: event._embedded.venues[0].city?.name,
              state: event._embedded.venues[0].state?.stateCode,
              address: event._embedded.venues[0].address?.line1,
              postalCode: event._embedded.venues[0].postalCode,
              location: event._embedded.venues[0].location,
            }
          : null,
        images:
          event.images?.filter(
            (img) => img.ratio === "16_9" && img.width >= 640
          ) || [],
        classifications: event.classifications?.[0]
          ? {
              genre: event.classifications[0].genre?.name,
              subGenre: event.classifications[0].subGenre?.name,
              segment: event.classifications[0].segment?.name,
              family: event.classifications[0].family,
            }
          : null,
      })) || [];

    return NextResponse.json({
      events,
      total: data.page?.totalElements || 0,
      page: data.page?.number || 0,
      size: data.page?.size || 20,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events", details: error.message },
      { status: 500 }
    );
  }
}
