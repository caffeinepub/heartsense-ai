import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { AssessmentInput, AssessmentResult } from '@/backend';

export function useCalculateRisk() {
  const { actor } = useActor();

  return useMutation<AssessmentResult, Error, AssessmentInput>({
    mutationFn: async (input: AssessmentInput) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }
      return await actor.calculateRisk(BigInt(0), input);
    },
  });
}
