// Community Intelligence Service
// Gathers real-world data about communities, counties, states, and federal policies
// Provides realistic context for gamification and scenario modeling

const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '');

const communityIntelligenceService = {
  // Data sources
  SOURCES: {
    CENSUS: 'census',
    BLS: 'bureau_labor_statistics',
    HUD: 'hud',
    ED_GOV: 'education_gov',
    HEALTH_GOV: 'health_gov',
    MUNICIPAL_DATA: 'municipal_data',
    COUNTY_DATA: 'county_data',
    STATE_POLICIES: 'state_policies',
    FEDERAL_POLICIES: 'federal_policies'
  },

  // Get comprehensive community profile
  async getCommunityProfile(location, options = {}) {
    const {
      includeNeighborhoods = true,
      includeDemographics = true,
      includeEconomics = true,
      includePolicies = true,
      includeServices = true
    } = options;

    try {
      const response = await fetch(`${API_URL}/api/intelligence/community-profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          location,
          includeNeighborhoods,
          includeDemographics,
          includeEconomics,
          includePolicies,
          includeServices
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch community profile');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching community profile:', error);
      return this.getMockCommunityProfile(location);
    }
  },

  // Mock community profile
  getMockCommunityProfile(location) {
    return {
      location: location || 'Durham, NC',
      lastUpdated: new Date().toISOString(),
      
      demographics: {
        population: 283506,
        medianAge: 34.2,
        medianIncome: 58641,
        povertyRate: 15.4,
        racialComposition: {
          white: 45.2,
          black: 38.5,
          hispanic: 14.1,
          asian: 5.3,
          other: 6.9
        },
        educationLevel: {
          highSchool: 88.3,
          bachelors: 47.2,
          graduate: 18.9
        }
      },

      economics: {
        unemploymentRate: 4.2,
        majorEmployers: [
          { name: 'Duke University', employees: 39000, sector: 'Education/Healthcare' },
          { name: 'IBM', employees: 10000, sector: 'Technology' },
          { name: 'Durham Public Schools', employees: 5200, sector: 'Education' }
        ],
        industries: [
          { sector: 'Healthcare', percentage: 18.5 },
          { sector: 'Education', percentage: 15.2 },
          { sector: 'Technology', percentage: 12.8 },
          { sector: 'Retail', percentage: 11.3 }
        ],
        housingCosts: {
          medianHomeValue: 285000,
          medianRent: 1245,
          homeownershipRate: 52.3
        }
      },

      services: {
        schools: {
          public: 52,
          private: 28,
          studentTeacherRatio: 14.2,
          graduationRate: 84.7
        },
        healthcare: {
          hospitals: 3,
          clinics: 47,
          mentalHealthProviders: 234,
          primaryCarePhysicians: 412
        },
        transportation: {
          publicTransit: true,
          busRoutes: 28,
          bikeability: 'moderate',
          walkability: 'high'
        },
        socialServices: {
          foodBanks: 12,
          shelters: 8,
          youthPrograms: 45,
          seniorCenters: 7
        }
      },

      policies: {
        municipal: [
          {
            name: 'Affordable Housing Initiative',
            status: 'active',
            budget: 15000000,
            impact: 'Aims to create 1000 affordable units by 2026'
          },
          {
            name: 'Youth Employment Program',
            status: 'active',
            budget: 2500000,
            impact: 'Provides summer jobs for 500 youth annually'
          }
        ],
        county: [
          {
            name: 'Mental Health Services Expansion',
            status: 'active',
            budget: 8000000,
            impact: 'Increases access to mental health services'
          }
        ],
        state: [
          {
            name: 'NC Medicaid Expansion',
            status: 'active',
            impact: 'Extends coverage to 600,000 residents'
          }
        ]
      },

      challenges: [
        {
          issue: 'Affordable Housing',
          severity: 'high',
          affectedPopulation: 45000,
          description: 'Rising housing costs displacing low-income residents'
        },
        {
          issue: 'Transportation Access',
          severity: 'medium',
          affectedPopulation: 28000,
          description: 'Limited public transit in some neighborhoods'
        },
        {
          issue: 'Youth Services',
          severity: 'medium',
          affectedPopulation: 15000,
          description: 'Insufficient after-school programs in certain areas'
        }
      ],

      opportunities: [
        {
          area: 'Technology Sector Growth',
          potential: 'high',
          description: 'Expanding tech industry creating new opportunities'
        },
        {
          area: 'Community Partnerships',
          potential: 'high',
          description: 'Strong nonprofit and university collaboration'
        }
      ],

      neighborhoods: [
        {
          name: 'Downtown Durham',
          population: 12500,
          medianIncome: 72000,
          characteristics: ['Urban', 'Walkable', 'Arts District'],
          challenges: ['Gentrification', 'Parking']
        },
        {
          name: 'Walltown',
          population: 8200,
          medianIncome: 38000,
          characteristics: ['Historic', 'Diverse', 'Community-focused'],
          challenges: ['Affordable Housing', 'Food Access']
        }
      ]
    };
  },

  // Get policy landscape (municipal, county, state, federal)
  async getPolicyLandscape(location, domain) {
    try {
      const response = await fetch(`${API_URL}/api/intelligence/policy-landscape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, domain })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch policy landscape');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching policy landscape:', error);
      return this.getMockPolicyLandscape(domain);
    }
  },

  // Mock policy landscape
  getMockPolicyLandscape(domain) {
    return {
      domain: domain || 'housing',
      levels: {
        municipal: {
          policies: [
            {
              name: 'Inclusionary Zoning Ordinance',
              adopted: '2022-03-15',
              description: 'Requires 15% affordable units in new developments',
              constraints: ['Applies to developments >50 units', 'Income limits at 80% AMI'],
              opportunities: ['Incentives for exceeding requirements', 'Density bonuses available']
            }
          ],
          budget: 15000000,
          authority: 'City Council',
          decisionMakers: ['Mayor', '13 Council Members']
        },
        county: {
          policies: [
            {
              name: 'Housing Trust Fund',
              adopted: '2021-07-01',
              description: 'Fund for affordable housing development',
              constraints: ['Limited to county residents', 'Income verification required'],
              opportunities: ['Grants available', 'Low-interest loans']
            }
          ],
          budget: 8000000,
          authority: 'County Commissioners',
          decisionMakers: ['5 Commissioners']
        },
        state: {
          policies: [
            {
              name: 'Low-Income Housing Tax Credit',
              description: 'State tax credits for affordable housing',
              constraints: ['Competitive application', 'Compliance requirements'],
              opportunities: ['Federal credits also available', 'Priority for certain areas']
            }
          ],
          authority: 'State Legislature',
          relevantAgencies: ['NC Housing Finance Agency']
        },
        federal: {
          policies: [
            {
              name: 'Section 8 Housing Choice Vouchers',
              description: 'Rental assistance for low-income families',
              constraints: ['Long waitlists', 'Landlord participation voluntary'],
              opportunities: ['Portable across jurisdictions', 'Utility allowances included']
            }
          ],
          relevantAgencies: ['HUD', 'Housing Authority']
        }
      },
      recentChanges: [
        {
          level: 'municipal',
          change: 'Increased affordable housing budget by 40%',
          date: '2024-01-15',
          impact: 'positive'
        }
      ],
      upcomingDecisions: [
        {
          level: 'county',
          decision: 'Housing Trust Fund allocation',
          date: '2025-02-01',
          stakeholders: ['Developers', 'Nonprofits', 'Residents']
        }
      ]
    };
  },

  // Get realistic constraints for scenario modeling
  async getRealisticConstraints(location, domain) {
    try {
      const response = await fetch(`${API_URL}/api/intelligence/constraints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, domain })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch constraints');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching constraints:', error);
      return this.getMockConstraints(domain);
    }
  },

  // Mock realistic constraints
  getMockConstraints(domain) {
    return {
      domain,
      constraints: [
        {
          type: 'policy',
          description: 'Zoning regulations limit density',
          level: 'municipal',
          flexibility: 'low',
          workarounds: ['Variance application', 'Rezoning petition']
        },
        {
          type: 'budget',
          description: 'Limited funding for new programs',
          level: 'county',
          flexibility: 'medium',
          workarounds: ['Grant applications', 'Public-private partnerships']
        },
        {
          type: 'capacity',
          description: 'Staff limitations for program implementation',
          level: 'municipal',
          flexibility: 'medium',
          workarounds: ['Volunteer recruitment', 'Partner organizations']
        }
      ],
      opportunities: [
        {
          type: 'funding',
          description: 'New federal grant program available',
          timeline: '6 months',
          requirements: ['Community needs assessment', 'Matching funds']
        }
      ]
    };
  },

  // Get stakeholder map
  async getStakeholderMap(location, issue) {
    try {
      const response = await fetch(`${API_URL}/api/intelligence/stakeholders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location, issue })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stakeholders');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching stakeholders:', error);
      return this.getMockStakeholderMap(issue);
    }
  },

  // Mock stakeholder map
  getMockStakeholderMap(issue) {
    return {
      issue,
      stakeholders: [
        {
          name: 'City Council',
          type: 'decision_maker',
          influence: 'high',
          position: 'mixed',
          interests: ['Budget constraints', 'Constituent pressure', 'Political considerations']
        },
        {
          name: 'Community Organizations',
          type: 'advocate',
          influence: 'medium',
          position: 'supportive',
          interests: ['Service delivery', 'Community needs', 'Funding']
        },
        {
          name: 'Residents',
          type: 'affected_party',
          influence: 'medium',
          position: 'varied',
          interests: ['Quality of life', 'Property values', 'Services']
        },
        {
          name: 'Business Community',
          type: 'stakeholder',
          influence: 'medium',
          position: 'concerned',
          interests: ['Economic impact', 'Workforce', 'Regulations']
        }
      ],
      powerDynamics: {
        coalitions: ['Affordable Housing Coalition', 'Business Alliance'],
        conflicts: ['Development vs. Preservation', 'Budget Priorities'],
        opportunities: ['Shared interests in economic development']
      }
    };
  }
};

export default communityIntelligenceService;
