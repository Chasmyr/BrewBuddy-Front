import { Box, Divider, Grid, Skeleton } from "@mui/material";

const RecipeFullDetailsSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Titre */}
      <Box>
        <Skeleton variant="text" width="60%" height={40} />
        <Divider sx={{ width: "100%", my: 1 }} />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="rounded" width={120} height={32} />
          ))}
        </Box>
      </Box>

      {/* Présentation */}
      <Box sx={{ mt: 3 }}>
        <Skeleton variant="text" width="40%" height={32} />
        <Divider sx={{ width: "100%", my: 2 }} />
        <Skeleton variant="text" width="100%" height={24} />
        <Skeleton variant="text" width="95%" height={24} />
        <Skeleton variant="text" width="80%" height={24} />
      </Box>

      {/* Ingrédients */}
      <Box sx={{ mt: 4 }}>
        <Skeleton variant="text" width="40%" height={32} />
        <Divider sx={{ width: "100%", my: 2 }} />
        <Grid container spacing={4}>
          {[...Array(3)].map((_, i) => (
            <Grid size={{xs: 12, sm:6, md:4}} key={i}>
              <Skeleton variant="text" width="60%" height={20} />
              {[...Array(2)].map((__, j) => (
                <Skeleton key={j} variant="text" width="90%" height={20} sx={{ mt: 1 }} />
              ))}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Étapes d'empâtage */}
      <Box sx={{ mt: 4 }}>
        <Skeleton variant="text" width="40%" height={32} />
        <Divider sx={{ width: "100%", my: 2 }} />
        {[...Array(2)].map((_, i) => (
          <Box
            key={i}
            sx={{
              boxShadow: 2,
              p: 2,
              my: 2,
              borderRadius: 2
            }}
          >
            <Skeleton variant="text" width="30%" height={24} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
        ))}
      </Box>

      {/* Ébullition */}
      <Box sx={{ mt: 4 }}>
        <Skeleton variant="text" width="40%" height={32} />
        <Divider sx={{ width: "100%", my: 2 }} />
        {[...Array(2)].map((_, i) => (
          <Box
            key={i}
            sx={{
              boxShadow: 2,
              p: 2,
              my: 2,
              borderRadius: 2
            }}
          >
            <Skeleton variant="text" width="30%" height={24} />
            <Skeleton variant="text" width="75%" height={20} />
          </Box>
        ))}
      </Box>

      {/* Fermentation */}
      <Box sx={{ mt: 4 }}>
        <Skeleton variant="text" width="40%" height={32} />
        <Divider sx={{ width: "100%", my: 2 }} />
        {[...Array(2)].map((_, i) => (
          <Box
            key={i}
            sx={{
              boxShadow: 2,
              p: 2,
              my: 2,
              borderRadius: 2
            }}
          >
            <Skeleton variant="text" width="40%" height={24} />
            <Skeleton variant="text" width="70%" height={20} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecipeFullDetailsSkeleton;
