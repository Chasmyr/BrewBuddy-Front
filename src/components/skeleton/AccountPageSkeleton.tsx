import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Skeleton,
} from '@mui/material'
import Header from '../../layout/Header'
import Footer from '../../layout/Footer'

const AccountPageSkeleton = () => {
  return (
    <>
        <Header />
        <Box
        sx={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            bgcolor: {
            xs: '#F99926',
            },
        }}
        >
        <Box
            sx={{
            width: {
                xl: '45%',
                lg: '60%',
                md: '70%',
                sm: '90%',
                xs: '95%',
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            }}
        >
            <Box
            sx={{
                width: '100%',
                mb: 6,
                mt: { xs: 10, sm: 0 },
                height: '100%',
            }}
            >
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                width: {
                    md: 'calc(100% - 96px)',
                    sm: 'calc(100% - 48px)',
                },
                bgcolor: '#FFFCF2',
                p: {
                    xs: 3,
                    md: 6,
                },
                borderRadius: 2,
                mt: { xs: 0, sm: 12 },
                boxShadow: 2,
                }}
            >
                <Grid container spacing={4} padding={4}>
                {/* Colonne gauche */}
                <Grid size={{xs: 12, md: 6}}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                    <Skeleton variant="circular" width={200} height={200} />
                    <Box width="100%">
                        <Skeleton height={24} sx={{ mt: 3 }} />
                        <Skeleton height={24} sx={{ mt: 1 }} />
                        <Skeleton height={24} sx={{ mt: 1 }} />
                    </Box>

                    <Divider sx={{ width: '100%', my: 2 }} />
                    <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 16 }} />
                    <Divider sx={{ width: '100%', my: 2 }} />

                    <Skeleton variant="rectangular" height={40} width="100%" sx={{ mb: 1, borderRadius: 1 }} />
                    <Skeleton variant="rectangular" height={40} width="100%" sx={{ mb: 1, borderRadius: 1 }} />
                    <Skeleton variant="rectangular" height={40} width="100%" sx={{ borderRadius: 1 }} />
                    </Box>
                </Grid>

                {/* Colonne droite */}
                <Grid size={{xs: 12, md: 6}}>
                    <Grid container spacing={3} sx={{ height: '100%' }}>
                    {[1, 2, 3].map((index) => (
                        <Grid size={12} key={index}>
                        <Card
                            variant="outlined"
                            sx={{
                            borderColor: 'primary.main',
                            bgcolor: 'background.default',
                            height: '100%',
                            }}
                        >
                            <CardContent>
                            <Skeleton height={30} />
                            </CardContent>
                        </Card>
                        </Grid>
                    ))}
                    </Grid>
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Box>
        </Box>
        <Footer />
    </>
  )
}

export default AccountPageSkeleton
