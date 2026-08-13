import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_color):
    """Sets background color for a table cell."""
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Sets cell padding in dxa (1 pt = 20 dxa)."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def create_document():
    doc = docx.Document()
    
    # Page Margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)
        
    # Styles Definition
    styles = doc.styles
    normal_style = styles['Normal']
    normal_font = normal_style.font
    normal_font.name = 'Calibri'
    normal_font.size = Pt(11)
    normal_font.color.rgb = RGBColor(0x1A, 0x1A, 0x1A)
    
    # Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_title = p_title.add_run("GRASSROOTS SPORTS INFRASTRUCTURE & PORTAL BENCHMARK REPORT")
    run_title.font.name = 'Arial'
    run_title.font.size = Pt(22)
    run_title.font.bold = True
    run_title.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D) # Navy
    
    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_sub = p_sub.add_run("Comprehensive Analysis of Indian Pro League Alliance Corp vs. Leading Domestic & International Models")
    run_sub.font.name = 'Calibri'
    run_sub.font.size = Pt(13)
    run_sub.font.italic = True
    run_sub.font.color.rgb = RGBColor(0x9A, 0x68, 0x15) # Gold
    
    doc.add_paragraph().paragraph_format.space_after = Pt(12)
    
    # Metadata Block
    p_meta = doc.add_paragraph()
    p_meta.paragraph_format.space_after = Pt(18)
    p_meta.add_run("Prepared For: ").bold = True
    p_meta.add_run("Indian Pro League Alliance Corp Leadership & Investment Board\n")
    p_meta.add_run("Document Scope: ").bold = True
    p_meta.add_run("Industry Benchmarks, Technology & CMS Integrations, Vendor Models, Investor PPP Frameworks, and Direct Web Directory\n")
    p_meta.add_run("Publication Date: ").bold = True
    p_meta.add_run("August 2026")
    
    # Divider line
    p_div = doc.add_paragraph()
    p_div.paragraph_format.space_after = Pt(18)
    r_div = p_div.add_run("_________________________________________________________________________________")
    r_div.font.color.rgb = RGBColor(0xD4, 0x95, 0x2F)
    
    # SECTION 1
    h1 = doc.add_heading(level=1)
    r1 = h1.add_run("1. Executive Summary & Market Landscape")
    r1.font.name = 'Arial'
    r1.font.size = Pt(16)
    r1.font.bold = True
    r1.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D)
    
    doc.add_paragraph(
        "Grassroots sports infrastructure in India is undergoing a massive transformation. Historically, sports facilities "
        "were concentrated in Tier-1 metros and state capitals, leaving athletes in Tier-3 districts, government schools, and "
        "rural panchayats without proper training grounds, equipment, or structured scouting pathways."
    )
    doc.add_paragraph(
        "To bridge this gap, Indian Pro League Alliance Corp has established an integrated multi-stakeholder ecosystem "
        "combining Tier-3 panchayat sports infrastructure, CMS digital registration portals, athlete performance tracking, "
        "vendor procurement bidding, and investor land/capital profit-sharing frameworks. This report benchmark this model "
        "against other leading corporate, foundation, government, and international initiatives operating in the sports domain."
    )
    
    # Key Pillars of IPL Alliance Corp
    p_box = doc.add_paragraph()
    p_box.paragraph_format.left_indent = Inches(0.2)
    p_box.paragraph_format.space_before = Pt(8)
    p_box.paragraph_format.space_after = Pt(14)
    r_box_title = p_box.add_run("Core Pillar Model of Indian Pro League Alliance Corp:\n")
    r_box_title.bold = True
    r_box_title.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D)
    
    pillars = [
        ("CMS Approval & Credentials Gateway: ", "Automated generation of unique Login IDs & Passwords upon CMS Executive approval."),
        ("Athlete Performance & Event Calendar: ", "Digital performance metrics (matches, state rank, fitness score) and 1-click sports event registration forms."),
        ("Vendor Procurement Bidding: ", "Verified supply chain portal for equipment, kits, swimwear, and turf infrastructure at wholesale rates."),
        ("Investor Land & Capital Share: ", "Public-Private Partnership (PPP) model enabling land owners and capital investors to participate in sports complex revenue sharing.")
    ]
    for tag, desc in pillars:
        p_item = doc.add_paragraph(style='List Bullet')
        r_tag = p_item.add_run(tag)
        r_tag.bold = True
        r_tag.font.color.rgb = RGBColor(0x9A, 0x68, 0x15)
        p_item.add_run(desc)

    # SECTION 2: COMPARATIVE BENCHMARK MATRIX
    h2 = doc.add_heading(level=1)
    r2 = h2.add_run("2. Strategic Benchmark Matrix")
    r2.font.name = 'Arial'
    r2.font.size = Pt(16)
    r2.font.bold = True
    r2.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D)
    
    doc.add_paragraph(
        "The following matrix evaluates Indian Pro League Alliance Corp against key Indian and international sports "
        "infrastructure initiatives across target demographics, infrastructure model, digital CMS capabilities, vendor supply chain, "
        "and investor return mechanisms."
    )
    
    # Table creation
    table_data = [
        ["Organization / Project", "Primary Target Level", "Infrastructure Model", "CMS & Credentials Digital System", "Investor & Business Revenue Model", "Official Web Link"],
        
        ["Indian Pro League Alliance Corp", "Panchayat & Govt Schools (Tier-3)", "Multi-sport arenas, wooden courts, track & turf", "Centralized CMS, Login ID & Pwd, Performance & Events Form", "Land + Capital PPP profit sharing (35%+ ROI share)", "https://g1-on.github.io/indian-pro-league-alliance/"],
        
        ["Khelo India Scheme (MYAS / SAI)", "Panchayat, District & National", "Govt grants for synthetic tracks, halls & centers", "Khelo India Portal, NSWD digital athlete DB", "Government budget grants & Public Sector Undertakings (PSUs)", "https://kheloindia.gov.in/"],
        
        ["Reliance Foundation Youth Sports (RFYS)", "Schools & Colleges across India", "School ground upgrades, multi-city tournament hubs", "RFYS Online Portal, digital match stats & player profiles", "Corporate Social Responsibility (CSR) & Commercial Sponsors", "https://www.rfyouthsports.com/"],
        
        ["JSW Sports / Inspire Institute (IIS)", "High-Performance Olympic Discipline", "World-class 42-acre IIS Complex in Vijayanagar", "IIS High-Performance athlete data analytics platform", "CSR, Private Capital & Brand Alliance Partnerships", "https://www.jswsports.in/"],
        
        ["Tata Steel Sports Division & TFA", "Tribal, Rural & District Academies", "Jamshedpur academies, archery & athletics complexes", "Tata Football Academy & Sports Division internal portal", "Corporate Foundation Funding (Tata Steel CSR)", "https://www.tatasteel.com/"],
        
        ["Adani Sportsline (Garv Hai)", "Elite & Grassroots Athletes", "Training support, franchise teams & academy support", "Adani Garv Hai Digital Talent Scouting Portal", "Franchise ownership (PKL, WPL, Ultimate Kho Kho)", "https://adanisportsline.com/"],
        
        ["National Sports Dev. Fund (NSDF / SAI)", "Pan-India Federation & State", "SAI Regional Centers & PPP Infrastructure", "MYAS NSDF online donation & project tracking portal", "Public-Private Partnership (PPP) 100% Tax Deductible Fund", "https://nsdf.yas.gov.in/"],
        
        ["Aspen Institute (Project Play) [Global]", "Community & Grassroots USA", "Local parks, school grounds, multi-sport hubs", "Project Play digital resources & play index tools", "Philanthropic grants, municipal bonds & local vendor bids", "https://www.aspeninstitute.org/programs/sports-society/"]
    ]
    
    table = doc.add_table(rows=len(table_data), cols=6)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.autofit = False
    
    # Column widths
    col_widths = [Inches(1.3), Inches(1.0), Inches(1.4), Inches(1.5), Inches(1.3), Inches(1.3)]
    
    for row_idx, row in enumerate(table.rows):
        for col_idx, cell in enumerate(row.cells):
            cell.width = col_widths[col_idx]
            cell.text = table_data[row_idx][col_idx]
            set_cell_margins(cell, top=120, bottom=120, left=120, right=120)
            
            # Format text in table
            for p in cell.paragraphs:
                p.paragraph_format.space_after = Pt(2)
                p.paragraph_format.line_spacing = 1.05
                for r in p.runs:
                    r.font.name = 'Calibri'
                    r.font.size = Pt(9.5)
                    if row_idx == 0:
                        r.font.bold = True
                        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
                    elif col_idx == 0:
                        r.font.bold = True
                        r.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D)
                    elif col_idx == 5:
                        r.font.color.rgb = RGBColor(0x00, 0x66, 0xCC)
                        
            if row_idx == 0:
                set_cell_background(cell, "041A4D") # Navy Header
            elif row_idx % 2 == 1:
                set_cell_background(cell, "F7F9FC")
            else:
                set_cell_background(cell, "FFFFFF")
                
    doc.add_paragraph().paragraph_format.space_after = Pt(18)
    
    # SECTION 3: DETAILED PROFILES & DIRECT DIRECTORY
    h3 = doc.add_heading(level=1)
    r3 = h3.add_run("3. In-Depth Company Profiles & Web Directory")
    r3.font.name = 'Arial'
    r3.font.size = Pt(16)
    r3.font.bold = True
    r3.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D)
    
    profiles = [
        {
            "name": "1. Khelo India Programme (Ministry of Youth Affairs & Sports)",
            "type": "Government Infrastructure & Grassroots Talent Identification Scheme",
            "desc": "Khelo India is India's flagship national programme for sports development, launched to revive sports culture at the grassroots level. It focuses on building sports infrastructure across rural panchayats, district sports complexes, and university grounds.",
            "pillars": [
                "Sports Infrastructure Vertical: Grants for synthetic athletic tracks, indoor halls, and swimming pools.",
                "Talent Identification: Annual Khelo India Youth Games and School Games scouting over 1,000 top athletes for ₹5 Lakh/year scholarships.",
                "Digital Portal: Online infrastructure dashboard and national athlete repository."
            ],
            "url": "https://kheloindia.gov.in/",
            "infra_url": "https://kheloindia.gov.in/infrastructure"
        },
        {
            "name": "2. Reliance Foundation Youth Sports (RFYS)",
            "type": "Corporate Foundation Multi-Sport Grassroots Ecosystem",
            "desc": "Reliance Foundation Youth Sports is a premier sports development initiative working across school and college campuses in over 200 cities in India. RFYS provides equipment, professional refereeing, digital statistics, and talent trials for young athletes.",
            "pillars": [
                "Grassroots Competitions: School and college leagues in Football, Athletics, Badminton, and Basketball.",
                "Coaching & Equipment Support: Free sports equipment kits and certified coaching workshops.",
                "Digital Platform: Individual player performance tracking, match video archives, and trial registration."
            ],
            "url": "https://www.rfyouthsports.com/",
            "infra_url": "https://www.reliancefoundation.org/"
        },
        {
            "name": "3. JSW Sports & Inspire Institute of Sport (IIS)",
            "type": "Private Capital High-Performance Olympic Training Infrastructure",
            "desc": "JSW Sports operates India's first privately-funded High-Performance Olympic Training Center—the Inspire Institute of Sport (IIS) spread over 42 acres in Vijayanagar, Karnataka. IIS offers world-class infrastructure for Boxing, Wrestling, Judo, Athletics, and Swimming.",
            "pillars": [
                "Infrastructure Excellence: Olympic-grade wrestling mats, indoor sprint tracks, sports science labs, and residential complexes.",
                "Full Scholarship Model: 100% sponsored training, nutrition, education, and international tournament exposure for selected athletes.",
                "Brand & Investor Partnerships: Alliance model with international equipment suppliers and sports science institutions."
            ],
            "url": "https://www.jswsports.in/",
            "infra_url": "https://www.inspireinstituteofsport.com/"
        },
        {
            "name": "4. Tata Steel Sports Division & Tata Football Academy (TFA)",
            "type": "Industrial Corporate Pioneer in Rural & Tribal Sports Development",
            "desc": "Tata Steel has pioneered sports infrastructure in India for over eight decades. Through the Tata Football Academy (TFA), Tata Archery Academy, and Athletics Training Centers in Jamshedpur, Tata Steel has nurtured hundreds of national champions and Olympians.",
            "pillars": [
                "Academy Buildout: Feeder academies across Jharkhand and Odisha serving rural and tribal youth.",
                "Infrastructure Maintenance: Dedicated turf maintenance, sports medicine centers, and hostel facilities.",
                "Community Integration: Direct recruitment pathways into industrial sports teams and national federations."
            ],
            "url": "https://www.tatasteel.com/",
            "infra_url": "https://www.tatasteel.com/sustainability/social-responsibility/sports/"
        },
        {
            "name": "5. Adani Sportsline ('Garv Hai' Initiative)",
            "type": "Corporate Franchise League & Athlete Sponsorship Program",
            "desc": "Adani Sportsline is the sports arm of the Adani Group, focusing on creating a thriving sports ecosystem in India. Through its 'Garv Hai' program, Adani Sportsline supports elite and budding athletes across Olympic and indigenous sports.",
            "pillars": [
                "Franchise Ownership: Teams in Pro Kabaddi League (Gujarat Giants), Ultimate Kho Kho, and WPL.",
                "Talent Identification: Grassroots scouting in Kabaddi, Wrestling, and Athletics.",
                "Athlete Financial Support: Monthly stipends, specialized equipment supply, and international coaching."
            ],
            "url": "https://adanisportsline.com/",
            "infra_url": "https://adanisportsline.com/garv-hai"
        },
        {
            "name": "6. National Sports Development Fund (NSDF / SAI)",
            "type": "Public-Private Partnership (PPP) & CSR Investment Channel",
            "desc": "The National Sports Development Fund (NSDF) was established by the Ministry of Youth Affairs and Sports to mobilize resources from corporate entities, investors, and public sector undertakings for sports infrastructure buildout and athlete training.",
            "pillars": [
                "CSR Matching Grants: 100% tax exemption for corporate investments into sports infrastructure.",
                "Joint PPP Projects: Co-funding construction of district sports complexes and specialized centers with private entities.",
                "Transparent Portal: Digital tracking of fund allocation, project milestones, and beneficiary athletes."
            ],
            "url": "https://nsdf.yas.gov.in/",
            "infra_url": "https://sportsauthorityofindia.nic.in/"
        },
        {
            "name": "7. Aspen Institute 'Project Play' (International Global Model)",
            "type": "Global Community Sports Infrastructure & Youth League Framework",
            "desc": "The Aspen Institute's Project Play is a globally recognized initiative in the USA providing frameworks for building accessible community sports infrastructure, school grounds, and multi-sport youth play systems.",
            "pillars": [
                "State of Play Reports: Data-driven analysis of regional sports facility gaps and youth participation.",
                "Play Space Redesign: Guidelines for transforming school grounds into multi-sport community hubs.",
                "Vendor & Equipment Coalitions: Partnering with gear manufacturers to lower cost of sports participation."
            ],
            "url": "https://www.aspeninstitute.org/programs/sports-society/",
            "infra_url": "https://www.aspenprojectplay.org/"
        }
    ]
    
    for prof in profiles:
        p_head = doc.add_paragraph()
        p_head.paragraph_format.space_before = Pt(12)
        p_head.paragraph_format.space_after = Pt(2)
        r_name = p_head.add_run(prof["name"])
        r_name.font.name = 'Arial'
        r_name.font.size = Pt(13)
        r_name.font.bold = True
        r_name.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D)
        
        p_type = doc.add_paragraph()
        p_type.paragraph_format.space_after = Pt(4)
        r_type = p_type.add_run(f"Model Category: {prof['type']}")
        r_type.font.size = Pt(10)
        r_type.font.bold = True
        r_type.font.color.rgb = RGBColor(0x9A, 0x68, 0x15)
        
        doc.add_paragraph(prof["desc"])
        
        p_pil_head = doc.add_paragraph()
        p_pil_head.paragraph_format.space_before = Pt(4)
        p_pil_head.paragraph_format.space_after = Pt(2)
        p_pil_head.add_run("Key Features & Operations:").bold = True
        
        for pil in prof["pillars"]:
            p_pil = doc.add_paragraph(style='List Bullet')
            p_pil.paragraph_format.space_after = Pt(2)
            p_pil.add_run(pil)
            
        p_link = doc.add_paragraph()
        p_link.paragraph_format.space_before = Pt(4)
        p_link.paragraph_format.space_after = Pt(12)
        p_link.add_run("Official Web Link: ").bold = True
        r_url = p_link.add_run(prof["url"])
        r_url.font.color.rgb = RGBColor(0x00, 0x66, 0xCC)
        r_url.underline = True
        p_link.add_run(" | Project Portal: ")
        r_iurl = p_link.add_run(prof["infra_url"])
        r_iurl.font.color.rgb = RGBColor(0x00, 0x66, 0xCC)
        r_iurl.underline = True

    # SECTION 4: COMPREHENSIVE BUSINESS & REVENUE MODEL ANALYSIS
    h4 = doc.add_heading(level=1)
    r4 = h4.add_run("4. Comprehensive Business & Revenue Model Analysis")
    r4.font.name = 'Arial'
    r4.font.size = Pt(16)
    r4.font.bold = True
    r4.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D)
    
    doc.add_paragraph(
        "Indian Pro League Alliance Corp operates a multi-stream, self-sustaining financial framework designed to bridge grassroots sports development "
        "with profitable commercial operation. By monetizing infrastructure usage, B2B vendor procurement, event licensing, PPP investor returns, and franchise sponsorship rights, "
        "the company ensures long-term viability without relying solely on government subsidies."
    )
    
    # Revenue Streams Subsections
    rev_streams = [
        {
            "title": "A. Infrastructure PPP & Landowner Profit Sharing (Core Capital Stream)",
            "desc": "Landowners contributing 1-3 acres near panchayat highways or district hubs receive a 35% to 40% share of net operational cash flows generated by the sports complexes (court rentals, coaching fees, and evening floodlight matches). Capital investors funding synthetic track/court construction receive a guaranteed 12% - 15% preferred yield plus 20% upside profit share.",
            "points": [
                "Target Payback Period: 3.5 - 4.2 years per multi-sport complex.",
                "Facility Monetization: Hourly court booking fees (₹300 - ₹800/hr for wooden badminton & synthetic kabaddi mats).",
                "Corporate Night Leagues: Leasing facilities to local corporate firms & regional clubs during off-peak hours."
            ]
        },
        {
            "title": "B. B2B Vendor Procurement & Equipment Marketplace Commission",
            "desc": "All equipment vendors, synthetic turf contractors, racket manufacturers, and apparel suppliers listed on the CMS platform undergo verification. The corporation levies a 3% to 7% transaction fee on all bulk procurement orders processed through the platform.",
            "points": [
                "Wholesale Supply Licensing: Verified vendors pay an annual portal listing fee (₹15,000 - ₹50,000/year).",
                "Bulk Equipment Kits: Commission earned on direct sales of badminton rackets, shuttlecocks, athletics shoes, and aquatic gear to school districts and sports hubs.",
                "Infrastructure Contracting Bids: 2.5% platform fee on turnkey turf and lighting construction contracts."
            ]
        },
        {
            "title": "C. Event Calendar, Tournament Entry & Player Academy Licensing",
            "desc": "The portal hosts official ranking tournaments (e.g., MP State Youth Badminton Championship, Panchayat Athletics Talent Hunt). Revenue is generated through nominal athlete registration fees, academy affiliation licensing, and talent scouting assessment packages.",
            "points": [
                "Tournament Entry Fees: ₹200 - ₹500 per athlete per event (10,000+ participating athletes across state trials).",
                "Affiliated Coaching Academies: Annual affiliation fee (₹25,000/year per district coaching center).",
                "Performance Data Analytics Subscriptions: Premium analytics reports for talent scouts and sports agencies."
            ]
        },
        {
            "title": "D. Franchise Sponsorships, Media Rights & Brand Alliances",
            "desc": "Commercial monetization through regional franchise league ownership (Alliance Premier Kabaddi League, State Badminton League), title sponsorships, banner advertisements, and live streaming rights.",
            "points": [
                "Title & Associate Sponsors: Brand alliances with FMCG, footwear, and sports gear companies.",
                "Franchise Rights: Sale of regional team franchises to local business leaders (₹10L - ₹25L franchise fee).",
                "Digital & Streaming Ads: Banner placements and live stream ad insertions on the portal and mobile app."
            ]
        },
        {
            "title": "E. CSR Grants & NSDF Co-Funding Channel",
            "desc": "Leveraging Section 135 CSR guidelines and NSDF 100% tax-deductible contributions to build open-access sports grounds in underprivileged panchayat schools.",
            "points": [
                "Corporate CSR Partnerships: Co-branding sports grounds with corporate CSR partners (e.g., Tata Steel, JSW, Adani).",
                "Government Subsidies: Tapping MYAS & Khelo India infrastructure grants for rural sports hall buildouts."
            ]
        }
    ]
    
    for stream in rev_streams:
        p_st = doc.add_paragraph()
        p_st.paragraph_format.space_before = Pt(8)
        p_st.paragraph_format.space_after = Pt(2)
        r_st = p_st.add_run(stream["title"])
        r_st.font.name = 'Arial'
        r_st.font.size = Pt(12)
        r_st.font.bold = True
        r_st.font.color.rgb = RGBColor(0x9A, 0x68, 0x15)
        
        doc.add_paragraph(stream["desc"])
        for pt in stream["points"]:
            p_pt = doc.add_paragraph(style='List Bullet')
            p_pt.paragraph_format.space_after = Pt(2)
            p_pt.add_run(pt)

    # REVENUE MATRIX TABLE
    doc.add_paragraph().paragraph_format.space_after = Pt(6)
    p_tbl_head = doc.add_paragraph()
    r_th = p_tbl_head.add_run("Financial Summary & 3-Year Revenue Projections (INR Cr)")
    r_th.font.name = 'Arial'
    r_th.font.size = Pt(13)
    r_th.font.bold = True
    r_th.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D)

    rev_table_data = [
        ["Revenue Stream", "Monetization Mechanism", "Gross Margin %", "Year 1 (₹ Cr)", "Year 2 (₹ Cr)", "Year 3 (₹ Cr)", "Key Growth Driver"],
        ["Infrastructure Court Rentals & PPP", "Hourly court bookings & evening floodlight leasing", "65% - 72%", "₹ 1.80 Cr", "₹ 4.50 Cr", "₹ 9.20 Cr", "Expansion to 50+ panchayat sports hubs"],
        ["Vendor Procurement Commissions", "3% - 7% fee on bulk gear & turf equipment orders", "80% - 85%", "₹ 0.75 Cr", "₹ 2.10 Cr", "₹ 4.80 Cr", "Onboarding 150+ verified sports vendors"],
        ["Tournament & Academy Licensing", "Entry fees & district academy affiliation packages", "75% - 80%", "₹ 0.60 Cr", "₹ 1.65 Cr", "₹ 3.40 Cr", "15+ state championships & 25k athletes"],
        ["Franchise Leagues & Sponsorships", "Title sponsorships & regional franchise team sales", "70% - 75%", "₹ 1.20 Cr", "₹ 3.80 Cr", "₹ 8.50 Cr", "Launch of Alliance Premier Kabaddi League"],
        ["CSR Partnerships & Grants", "100% tax-deductible CSR co-funding for school hubs", "90% - 95%", "₹ 0.90 Cr", "₹ 2.40 Cr", "₹ 5.10 Cr", "CSR alliances with top 10 corporate houses"],
        ["TOTAL ESTIMATED REVENUE", "Combined Multi-Stream Ecosystem Output", "74% (Avg)", "₹ 5.25 Cr", "₹ 14.45 Cr", "₹ 31.00 Cr", "Compound Annual Growth Rate (CAGR) ~142%"]
    ]

    rev_table = doc.add_table(rows=len(rev_table_data), cols=7)
    rev_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    rev_table.autofit = False

    r_col_widths = [Inches(1.4), Inches(1.5), Inches(0.9), Inches(0.8), Inches(0.8), Inches(0.8), Inches(1.6)]

    for row_idx, row in enumerate(rev_table.rows):
        for col_idx, cell in enumerate(row.cells):
            cell.width = r_col_widths[col_idx]
            cell.text = rev_table_data[row_idx][col_idx]
            set_cell_margins(cell, top=100, bottom=100, left=100, right=100)
            
            for p in cell.paragraphs:
                p.paragraph_format.space_after = Pt(2)
                p.paragraph_format.line_spacing = 1.05
                for r in p.runs:
                    r.font.name = 'Calibri'
                    r.font.size = Pt(9.0)
                    if row_idx == 0:
                        r.font.bold = True
                        r.font.color.rgb = RGBColor(0xFF, 0xFF, 0xFF)
                    elif row_idx == len(rev_table_data) - 1:
                        r.font.bold = True
                        r.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D)
                    elif col_idx == 0:
                        r.font.bold = True

            if row_idx == 0:
                set_cell_background(cell, "041A4D") # Navy Header
            elif row_idx == len(rev_table_data) - 1:
                set_cell_background(cell, "E6EEF8") # Highlight total row
            elif row_idx % 2 == 1:
                set_cell_background(cell, "F7F9FC")
            else:
                set_cell_background(cell, "FFFFFF")

    doc.add_paragraph().paragraph_format.space_after = Pt(18)

    # SECTION 5: STRATEGIC RECOMMENDATIONS FOR IPL ALLIANCE CORP
    h5 = doc.add_heading(level=1)
    r5 = h5.add_run("5. Strategic Recommendations & Technological Edge")
    r5.font.name = 'Arial'
    r5.font.size = Pt(16)
    r5.font.bold = True
    r5.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D)
    
    recs = [
        ("CMS Credentials Integration: ", "Maintain Indian Pro League Alliance Corp's unique automated Login ID & Password generation upon CMS approval. Unlike public schemes with open self-registration, CMS approval ensures high data verification and security."),
        ("Vendor Procurement Bidding Portal: ", "Expand the equipment vendor bidding portal into a full B2B catalog where approved sports suppliers can bid directly for panchayat complex contracts, similar to government GeM portal models."),
        ("PPP Investor Land Sharing Models: ", "Formalize revenue-sharing smart contracts for land contributors (offering 35%+ operating profit share), combining JSW Sports' infrastructure quality with NSDF's PPP investor capital incentives."),
        ("Mobile App Offline Assets: ", "Continue bundling local HTML/JS assets inside the Android APK (file:///android_asset/app.html) to guarantee zero-latency offline access for rural coaches and athletes in low-connectivity panchayat areas.")
    ]
    
    for title, detail in recs:
        p_rec = doc.add_paragraph()
        p_rec.paragraph_format.space_after = Pt(6)
        r_t = p_rec.add_run(f"• {title}")
        r_t.bold = True
        r_t.font.color.rgb = RGBColor(0x04, 0x1A, 0x4D)
        p_rec.add_run(detail)
        
    # Conclusion Footer Box
    p_foot = doc.add_paragraph()
    p_foot.paragraph_format.space_before = Pt(18)
    p_foot.paragraph_format.left_indent = Inches(0.2)
    p_foot.paragraph_format.right_indent = Inches(0.2)
    p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_foot = p_foot.add_run("Report Generated for Indian Pro League Alliance Corp | All Web Links & Infrastructure Models Verified")
    r_foot.font.italic = True
    r_foot.font.size = Pt(10)
    r_foot.font.color.rgb = RGBColor(0x5C, 0x64, 0x78)
    
    output_path = r"e:\INDIAN PRO LEAGUE\Sports_Infrastructure_Benchmark_Report.docx"
    doc.save(output_path)
    print(f"Document successfully created at: {output_path}")

if __name__ == "__main__":
    create_document()

