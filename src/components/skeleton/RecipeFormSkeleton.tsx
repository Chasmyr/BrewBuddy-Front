import { Box, Skeleton, Typography } from "@mui/material"
import Header from "../../layout/Header"

const RecipeFormSkeleton = () => {
  return (
    <>
      <Header />
      <Box
          sx={{
              width: "100%",
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flexDirection: "column",
              bgcolor: {
                  xs: "#F99926"
              },
          }}
      >
        <Box
          sx={{
              width: {
                  xl: "45%",
                  lg: "60%",
                  md: "70%",
                  sm: "90%",
                  xs: "95%"
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
          }}
        >
          <Box
            sx={{
                mb: 2,
                mt: 16,
                color: '#FFFCF2',
                width: "100%",
                display: { xs: 'none', sm: 'block' }
            }}
          >
              <Typography variant="h4">
                  Créer ta propre recette de bière ! 🍻
              </Typography>
          </Box>
          <Box
            sx={{
                width: "100%",
                mb: 6,
                mt: {xs: 10, sm: 0},
                height: "100%"
            }}
          >  
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "column",
                width: {
                  md: "calc(100% - 96px)",
                  sm: "calc(100% - 48px)"
                },
                bgcolor: "#FFFCF2",
                p: {
                  xs: 3,
                  md: 6
                },
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column",
                  width: {
                    md: "calc(100% - 96px)",
                    sm: "calc(100% - 48px)"
                  },
                  bgcolor: "#FFFCF2",
                  px: {
                    xs: 3,
                    md: 6
                  },
                  pb: 4,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    flexWrap: "wrap"
                  }}
                >
                  {[...Array(5)].map((_, index) => (
                    <Skeleton
                      key={index}
                      variant="text"
                      sx={{
                        width: {
                          xs: "20px",
                          md: "80px"
                        }
                      }}
                      height={24}
                    />
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  mb: 4,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <Skeleton variant="text" width={200} height={30} />
              </Box>

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: {
                      xs: "column",
                      sm: "row"
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      maxWidth: {
                        xs: "100%",
                        sm: "300px"
                      }
                    }}
                  >
                    <Skeleton height={56} sx={{ mt: 2 }} />
                    <Skeleton height={56} sx={{ mt: 3 }} />
                  </Box>

                  {/* Sliders */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      width: {
                        xs: "100%",
                        sm: "50%"
                      },
                      mt: {
                        xs: 4,
                        sm: 0
                      }
                    }}
                  >
                    <Skeleton variant="text" width={100} sx={{ mb: 1 }} />
                    <Skeleton height={40} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width={100} sx={{ mb: 1 }} />
                    <Skeleton height={40} />
                  </Box>
                </Box>

                {/* Description field */}
                <Box sx={{ width: "100%", mt: 3, mb: 4 }}>
                  <Skeleton variant="rectangular" height={72} />
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: {
                  md: "calc(100% - 96px)",
                  sm: "calc(100% - 48px)"
                },
                bgcolor: "#FFFCF2",
                px: {
                  xs: 3,
                  md: 6
                },
                pb: 2,
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4
              }}
            >
              <Skeleton variant="rectangular" width={100} height={36} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default RecipeFormSkeleton
