import type { Metadata } from "next";
import { listInquiries } from "@/server/inquiries";
import { PageHero } from "@/components/ui";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Staff inquiries",
  robots: { index: false, follow: false },
};
export default async function Admin() {
  const records = await listInquiries();
  return (
    <>
      <PageHero
        eyebrow="DEMO STAFF DASHBOARD"
        title="Travel inquiries."
        description="Review the most recent sample requests. For production, replace local authentication with a proper staff identity provider."
      />
      <section className="section">
        <div className="wrap">
          <h2>{records.length} recent inquiries</h2>
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Traveler</th>
                  <th>Details</th>
                  <th>Interests</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id}>
                    <td>
                      {r.id.slice(0, 8)}
                      <br />
                      {r.status}
                    </td>
                    <td>
                      {r.name}
                      <br />
                      {r.email}
                      <br />
                      {r.country}
                    </td>
                    <td>
                      {r.travelers} guests · {r.duration}
                      <br />
                      {r.budget}
                      <br />
                      {r.stay}
                      <br />
                      {r.arrival || "Flexible date"}
                      <br />
                      {r.journey || "Bespoke"}
                      <br />
                      {r.notes}
                    </td>
                    <td>{r.interests.join(", ")}</td>
                    <td>
                      {new Date(r.created_at).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!records.length && (
            <p>No inquiries yet. Submit a sample request to see it here.</p>
          )}
        </div>
      </section>
    </>
  );
}
